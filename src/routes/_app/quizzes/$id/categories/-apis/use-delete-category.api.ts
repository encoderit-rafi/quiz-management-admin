import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { QUERY_KEYS } from "@/query-keys";

export const useDeleteCategory = (quizId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (categoryId: number) =>
      api.delete(`/quiz/${quizId}/categories/${categoryId}`),
    onSuccess: () => {
      toast.success("Category deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_QUIZ_CATEGORIES(quizId),
      });
    },
    onError: (error) => {
      const fallback = "Failed to delete category.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
