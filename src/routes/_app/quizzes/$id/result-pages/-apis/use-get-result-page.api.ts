import { api } from "@/axios";
import { QUERY_KEYS } from "@/query-keys";
import { queryOptions } from "@tanstack/react-query";

export const useGetResultPage = (id: string | number) => {
  return queryOptions({
    queryKey: QUERY_KEYS.GET_RESULT_PAGE(id),
    queryFn: async () => {
      return (await api.get(`/result-pages/${id}`)).data?.data;
    },
    enabled: !!id,
  });
};
