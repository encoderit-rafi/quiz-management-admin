import { api } from "@/axios";
import { QUERY_KEYS } from "@/query-keys";
import { queryOptions } from "@tanstack/react-query";
import type { TFormLeadSchema } from "../-types";

export const useGetLeadSettings = (quizId: string | number) => {
  return queryOptions({
    queryKey: QUERY_KEYS.GET_LEAD_SETTINGS(quizId),
    queryFn: async () => {
      const res = await api.get<{ data: TFormLeadSchema }>(
        `/quiz/${quizId}/lead-form-settings`
      );
      return res.data?.data;
    },
    enabled: !!quizId,
  });
};
