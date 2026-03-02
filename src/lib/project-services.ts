import type { FixedServiceDefinition } from "@/data/fixed-services";
import {
  getFixedService,
  getFixedServiceBySlugOrId,
  isFixedServiceId,
} from "@/data/fixed-services";

export type ProjectServiceUpdates = Record<string, unknown>;

export interface ProjectServiceSnapshot {
  id: string;
  slug: string;
  title: string;
  updates: ProjectServiceUpdates;
}

export interface EnrichedProjectService extends ProjectServiceSnapshot {
  sections: FixedServiceDefinition["sections"];
  description?: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const isUpdatesRecord = (value: unknown): value is ProjectServiceUpdates => {
  return isRecord(value);
};

const asNonEmptyString = (value: unknown) => {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
};

const pickFirstString = (...values: Array<string | undefined>) => {
  return values.find((value): value is string => typeof value === "string");
};

export function buildProjectServiceSnapshot(
  definition: FixedServiceDefinition
): ProjectServiceSnapshot {
  return {
    id: definition.id,
    slug: definition.slug,
    title: definition.title,
    updates: {},
  };
}

export function normalizeProjectService(
  value: unknown
): ProjectServiceSnapshot {
  if (!isRecord(value)) {
    return {
      id: "",
      slug: "",
      title: "Service",
      updates: {},
    };
  }

  const id =
    pickFirstString(
      asNonEmptyString(value.id),
      asNonEmptyString((value as Record<string, unknown>).serviceId),
      asNonEmptyString((value as Record<string, unknown>).serviceLabel)
    ) ?? "";

  const slug =
    pickFirstString(
      asNonEmptyString(value.slug),
      asNonEmptyString((value as Record<string, unknown>).serviceSlug),
      asNonEmptyString((value as Record<string, unknown>).serviceLabel)
    ) ?? "";

  const title =
    pickFirstString(
      asNonEmptyString(value.title),
      asNonEmptyString((value as Record<string, unknown>).serviceTitle),
      asNonEmptyString((value as Record<string, unknown>).serviceName)
    ) ?? "Service";

  const updates = isUpdatesRecord(value.updates)
    ? (value.updates as ProjectServiceUpdates)
    : {};

  return {
    id,
    slug,
    title,
    updates,
  };
}

export function enrichProjectService(value: unknown): EnrichedProjectService {
  const normalized = normalizeProjectService(value);

  let definition: FixedServiceDefinition | undefined;

  if (normalized.id) {
    if (isFixedServiceId(normalized.id)) {
      definition = getFixedService(normalized.id);
    }
  } else if (normalized.slug) {
    definition = getFixedServiceBySlugOrId(normalized.slug);
  }

  return {
    id: definition?.id ?? normalized.id,
    slug: definition?.slug ?? normalized.slug ?? normalized.id,
    title: normalized.title || definition?.title || "Service",
    updates: normalized.updates,
    sections: definition?.sections ?? [],
    description: definition?.description,
  };
}

export function enrichProjectServices(
  value: unknown
): EnrichedProjectService[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map(enrichProjectService);
}

export function snapshotFromPayload(value: unknown): ProjectServiceSnapshot {
  const normalized = normalizeProjectService(value);

  if (!normalized.id) {
    throw new Error("Service id is required to snapshot project service");
  }

  if (!isFixedServiceId(normalized.id)) {
    throw new Error("Invalid service id");
  }

  const definition = getFixedService(normalized.id);

  return {
    id: normalized.id,
    slug: normalized.slug || definition.slug,
    title: normalized.title || definition.title,
    updates: normalized.updates,
  };
}
