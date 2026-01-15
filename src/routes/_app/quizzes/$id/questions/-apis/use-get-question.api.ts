import { api } from "@/axios";
import { queryOptions } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/query-keys";

export const useGetQuestion = (id: string | number) => {
  return queryOptions({
    queryKey: QUERY_KEYS.GET_QUESTION(id),
    queryFn: async () => {
      return (await api.get(`/questions/${id}`)).data?.data;
    },
    enabled: !!id,
  });
};
