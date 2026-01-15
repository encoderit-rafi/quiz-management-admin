import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { serialize } from "object-to-formdata";
import omitEmpty from "omit-empty";
import { QUERY_KEYS } from "@/query-keys";

export const useCreateQuestion = (quizId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-question", quizId],
    mutationFn: async (body: any) => {
      const data = omitEmpty(body);
      const payload = serialize(data);

      return (
        await api.post("/questions", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      ).data;
    },
    onSuccess: () => {
      toast.success("Question created successfully!");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_QUESTIONS(quizId),
      });
    },
    onError: (error) => {
      const fallback = "Failed to create question.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
