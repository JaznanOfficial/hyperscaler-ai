"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAdminClient(clientId: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
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
      return data.client;
    },
    enabled: !!clientId,
    retry: false,
    onError: (error) => {
      toast.error("Unable to load client", {
        description:
          error instanceof Error ? error.message : "Unexpected error occurred",
      });
    },
  });

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-client", clientId] });
  };

  return {
    ...query,
    refetch,
  };
}
