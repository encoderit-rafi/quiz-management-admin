import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";

export const useUpdateQuizQuestions = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-quiz-questions", id],
    mutationFn: async (body: any) => {
      return (await api.post(`/quizzes/${id}/questions`, body)).data;
    },
    onSuccess: () => {
      toast.success("Questions updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["quiz-questions", id] });
      queryClient.invalidateQueries({ queryKey: ["get-quiz", id] });
    },
    onError: (error) => {
      const fallback = "Failed to update questions.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
