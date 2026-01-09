import { api } from "@/axios";
import { queryOptions } from "@tanstack/react-query";

export const useGetResultPages = (params?: any) => {
  return queryOptions({
    queryKey: ["result-pages", params],
    queryFn: async () => {
      const { data } = await api.get("/result-pages", { params });
      return data;
    },
  });
};
