import { api } from "@/axios";
import { QUERY_KEYS } from "@/query-keys";
import type { TMetaSchema } from "@/types";
import { queryOptions } from "@tanstack/react-query";
import type { TQuizQuestion } from "../-types";

export const useGetQuizQuestions = (id: string | number) => {
  return queryOptions({
    queryKey: QUERY_KEYS.GET_QUIZ_QUESTIONS(id),
    queryFn: async (): Promise<{
      data: TQuizQuestion[];
      meta: TMetaSchema;
    }> => {
      return (
        await api.get(`/questions`, {
          params: {
            quiz_id: id,
          },
        })
      ).data?.data;
    },
    enabled: !!id,
  });
};
