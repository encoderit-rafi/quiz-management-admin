import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import type { TQuizSettingsSchema } from "../-types";

export const useUpdateQuizSettings = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-quiz-settings", id],
    mutationFn: async (body: TQuizSettingsSchema) => {
      return (await api.post(`/quizzes/${id}/settings`, body)).data;
    },
    onSuccess: () => {
      toast.success("Settings updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["quiz-settings", id] });
    },
    onError: (error) => {
      const fallback = "Failed to update settings.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
