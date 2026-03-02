"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ClientDetail } from "@/data/clients";

export function useAdminClient(clientId: string) {
  const queryClient = useQueryClient();

  const query = useQuery<ClientDetail | undefined, Error>({
    queryKey: ["admin-client", clientId],
    queryFn: async () => {
      const response = await fetch(`/api/admin/clients/${clientId}`);
      if (!response.ok) {
        let message = "Failed to fetch client";
        try {
          const errorPayload = await response.json();
          if (typeof errorPayload?.error === "string") {
            message = errorPayload.error;
          }
        } catch (error) {
          // no-op, fall back to default message
        }
        throw new Error(message);
      }
      const data = await response.json();
      return data.client as ClientDetail;
    },
    enabled: !!clientId,
    retry: false,
  });

  if (query.error) {
    toast.error("Unable to load client", {
      description: query.error.message || "Unexpected error occurred",
    });
  }

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-client", clientId] });
  };

  return {
    ...query,
    refetch,
  };
}
