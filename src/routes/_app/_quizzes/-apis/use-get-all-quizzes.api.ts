import { api } from "@/axios";
import { queryOptions } from "@tanstack/react-query";

export const useGetAllQuizzes = () => {
  return queryOptions({
    queryKey: ["get-all-quizzes"],
    queryFn: async () => {
      return (await api.get("/quizzes")).data?.data;
    },
  });
};
