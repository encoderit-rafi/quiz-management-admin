import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { QUERY_KEYS } from "@/query-keys";
import type { TQuizCategoryFormSchema } from "../-types";

export const useUpdateCategory = (quizId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TQuizCategoryFormSchema }) =>
      api.put(`/quiz/${quizId}/categories/${id}`, data),
    onSuccess: () => {
      toast.success("Category updated successfully!");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_QUIZ_CATEGORIES(quizId),
      });
    },
    onError: (error) => {
      const fallback = "Failed to update category.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
