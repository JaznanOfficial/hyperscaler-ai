export interface ClientServiceEntry {
  serviceId?: string;
  serviceName?: string;
  serviceSlug?: string;
  sections?: unknown;
  updates?: Record<string, unknown>;
  description?: string;
  [key: string]: unknown;
}

const EMPTY_SERVICES: ClientServiceEntry[] = [];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const normalizeEntry = (value: unknown): ClientServiceEntry => {
  if (typeof value === "string") {
    return { serviceId: value };
  }

  if (isRecord(value)) {
    const entry = { ...value } as ClientServiceEntry;

    if (
      !entry.serviceId &&
      typeof (value as { id?: unknown }).id === "string"
    ) {
      entry.serviceId = (value as { id: string }).id;
    }

    if (
      !entry.serviceName &&
      typeof (value as { title?: unknown }).title === "string"
    ) {
      entry.serviceName = (value as { title: string }).title;
    }

    if (
      !entry.serviceSlug &&
      typeof (value as { slug?: unknown }).slug === "string"
    ) {
      entry.serviceSlug = (value as { slug: string }).slug;
    }

    return entry;
  }

  return {};
};

export function parseClientServiceServices(
  raw: string | null | undefined
): ClientServiceEntry[] {
  if (!raw || raw.trim().length === 0) {
    return EMPTY_SERVICES;
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.map((entry) => normalizeEntry(entry))
      : EMPTY_SERVICES;
  } catch {
    return EMPTY_SERVICES;
  }
}

export function serializeClientServiceServices(value: unknown): string {
  if (!value) {
    return "[]";
  }

  if (typeof value === "string") {
    try {
      JSON.parse(value);
      return value;
    } catch {
      return "[]";
    }
  }

  if (Array.isArray(value)) {
    const normalized = value.map((entry) => normalizeEntry(entry));
    return JSON.stringify(normalized);
  }

  if (isRecord(value)) {
    return JSON.stringify(normalizeEntry(value));
  }

  return JSON.stringify(value);
}
