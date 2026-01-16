import { queryOptions } from "@tanstack/react-query";
import { api } from "@/axios.ts";

export const useGetStatistics = (quizId?: string | number) => {
  return queryOptions({
    queryKey: ["leads", quizId],
    queryFn: async () => {
      try {
        const { data } = await api.get(`/quiz-statistics/detailed/${quizId}`);
        return data.data || data;
      } catch (e) {
        return null;
      }
    },
    enabled: !!quizId,
  });
};
