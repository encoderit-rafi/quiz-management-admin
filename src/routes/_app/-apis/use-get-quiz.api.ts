import { api } from "@/axios";
import { queryOptions } from "@tanstack/react-query";

export const useGetQuiz = (id: string | number) => {
  return queryOptions({
    queryKey: ["get-quiz", id],
    queryFn: async () => {
      return (await api.get(`/quizzes/${id}`)).data?.data;
    },
    enabled: !!id,
  });
};
