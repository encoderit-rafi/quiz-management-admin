import { api } from "@/axios";
import { QUERY_KEYS } from "@/query-keys";
import { queryOptions } from "@tanstack/react-query";

export type TResultPageRule = {
  id: number;
  result_page_id: number;
  priority: number;
  rule_type: string;
  category_id: number | null;
  threshold: number | null;
};

export const useGetResultPageRules = (resultPageId: string | number) => {
  return queryOptions({
    queryKey: QUERY_KEYS.GET_RESULT_PAGE_RULES(resultPageId),
    queryFn: async (): Promise<TResultPageRule[]> => {
      const res = await api.get(`/result-pages/${resultPageId}/rules`);
      return res.data.data ?? [];
    },
    enabled: !!resultPageId,
  });
};
