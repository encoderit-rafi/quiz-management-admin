import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { QUERY_KEYS } from "@/query-keys";

export const useDeleteQuestion = (quizId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-question", quizId],
    mutationFn: async (id: string | number) => {
      return (await api.delete(`/questions/${id}`)).data;
    },
    onSuccess: () => {
      toast.success("Question deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_QUESTIONS(quizId),
      });
    },
    onError: (error) => {
      const fallback = "Failed to delete question.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
