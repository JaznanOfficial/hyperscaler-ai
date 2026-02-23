"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useAdminClient(clientId: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admin-client", clientId],
    queryFn: async () => {
      const response = await fetch(`/api/admin/clients/${clientId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch client");
      }
      const data = await response.json();
      return data.client;
    },
    enabled: !!clientId,
  });

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-client", clientId] });
  };

  return {
    ...query,
    refetch,
  };
}
