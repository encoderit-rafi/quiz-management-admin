import { api } from "@/axios";
import { queryOptions } from "@tanstack/react-query";

export const useGetQuizQuestions = (id: string | number) => {
  return queryOptions({
    queryKey: ["quiz-questions", id],
    queryFn: async () => {
      return (await api.get(`/quizzes/${id}/questions`)).data?.data;
    },
    enabled: !!id,
  });
};
