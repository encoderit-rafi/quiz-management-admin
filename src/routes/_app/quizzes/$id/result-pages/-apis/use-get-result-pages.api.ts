import { api } from "@/axios";
import { QUERY_KEYS } from "@/query-keys";
import { queryOptions } from "@tanstack/react-query";

export const useGetResultPages = (params?: any) => {
  return queryOptions({
    queryKey: QUERY_KEYS.GET_RESULT_PAGES(params),
    queryFn: async () => {
      const { data } = await api.get("/result-pages", { params });
      return data?.data;
    },
  });
};
