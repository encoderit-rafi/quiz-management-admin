import { api } from "@/axios";
import { queryOptions } from "@tanstack/react-query";

export const useGetAllQuizzes = (params?: any) => {
  return queryOptions({
    queryKey: ["get-all-quizzes", params],
    queryFn: async () => {
      const { data } = await api.get("/quizzes", { params });
      return data; // Return full response object to access pagination
    },
  });
};
