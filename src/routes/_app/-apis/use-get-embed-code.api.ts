import { api } from "@/axios";
import { queryOptions } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/query-keys";

export const useGetEmbedCode = (quizId: string | number) => {
  return queryOptions({
    queryKey: QUERY_KEYS.GET_EMBED_CODE(quizId),
    queryFn: async (): Promise<{ embed_code: string }> => {
      const res = await api.get(`/quiz/${quizId}/embed-code`);
      return res.data.data;
    },
    enabled: !!quizId,
  });
};
