import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { QUERY_KEYS } from "@/query-keys";
import type { TQuizCategoryFormSchema } from "../-types";

export const useCreateCategory = (quizId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: TQuizCategoryFormSchema) =>
      api.post(`/quiz/${quizId}/categories`, body),
    onSuccess: () => {
      toast.success("Category created successfully!");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_QUIZ_CATEGORIES(quizId),
      });
    },
    onError: (error) => {
      const fallback = "Failed to create category.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
