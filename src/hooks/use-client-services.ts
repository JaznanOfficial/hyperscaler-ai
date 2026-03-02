"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

interface ClientService {
  id: string;
  status: string;
  services: Array<{ serviceName: string }>;
}

export function useClientServices() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["client-services"],
    queryFn: async () => {
      const response = await fetch("/api/client/client-services");
      if (!response.ok) {
        throw new Error("Failed to fetch client services");
      }
      const data = await response.json();
      return data.clientServices as ClientService[];
    },
  });

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["client-services"] });
  };

  return {
    ...query,
    refetch,
  };
}
