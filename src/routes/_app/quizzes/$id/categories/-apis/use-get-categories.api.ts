import { api } from "@/axios";
import { QUERY_KEYS } from "@/query-keys";
import { queryOptions } from "@tanstack/react-query";
import type { TQuizCategorySchema } from "@/routes/_app/-types/quiz.type";

export const useGetQuizCategories = (quizId: string | number) => {
  return queryOptions({
    queryKey: QUERY_KEYS.GET_QUIZ_CATEGORIES(quizId),
    queryFn: async (): Promise<TQuizCategorySchema[]> => {
      const res = await api.get(`/quiz/${quizId}/categories`);
      return res.data.data ?? [];
    },
    enabled: !!quizId,
  });
};
