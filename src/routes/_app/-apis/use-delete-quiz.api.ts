import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";

type TDeleteQuizParams = {
  id: string | number;
};

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-quiz"],
    mutationFn: ({ id }: TDeleteQuizParams) => {
      return api.delete(`/quizzes/${id}`);
    },
    onSuccess: () => {
      toast.success("Quiz deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
    onError: (error) => {
      const fallback = "Failed to delete quiz.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
