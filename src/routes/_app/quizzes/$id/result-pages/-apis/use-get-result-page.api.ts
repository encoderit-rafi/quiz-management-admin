import { api } from "@/axios";
import { queryOptions } from "@tanstack/react-query";

export const useGetResultPage = (id: string | number) => {
  return queryOptions({
    queryKey: ["result-page", id],
    queryFn: async () => {
      return (await api.get(`/result-pages/${id}`)).data?.data;
    },
    enabled: !!id,
  });
};
