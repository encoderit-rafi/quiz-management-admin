import { api } from "@/axios";
import { queryOptions } from "@tanstack/react-query";

export const useGetQuizSettings = (id: string | number) => {
  return queryOptions({
    queryKey: ["quiz-settings", id],
    queryFn: async () => {
      return (await api.get(`/quizzes/${id}/settings`)).data?.data;
    },
    enabled: !!id,
  });
};
