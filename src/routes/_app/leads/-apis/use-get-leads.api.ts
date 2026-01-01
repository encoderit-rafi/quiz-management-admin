import { api } from "@/axios";
import { queryOptions } from "@tanstack/react-query";

export const useGetLeads = (params?: any) => {
  return queryOptions({
    queryKey: ["leads", params],
    queryFn: async () => {
      // In a real app this would be: await api.get("/leads", { params });
      // For now we will rely on demo data injection similarly to others if API fails
      try {
        const { data } = await api.get("/leads", { params });
        return data;
      } catch (e) {
        return null; // Return null so we can fallback to demo data
      }
    },
  });
};
