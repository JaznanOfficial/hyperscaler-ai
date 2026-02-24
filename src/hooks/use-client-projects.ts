"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Project {
  id: string;
  status: string;
  services: Array<{ serviceName: string }>;
}

export function useClientProjects() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["client-projects"],
    queryFn: async () => {
      const response = await fetch("/api/client/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      return data.projects as Project[];
    },
  });

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["client-projects"] });
  };

  return {
    ...query,
    refetch,
  };
}
