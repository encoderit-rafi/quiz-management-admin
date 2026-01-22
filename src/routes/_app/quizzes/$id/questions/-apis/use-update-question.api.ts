import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { serialize } from "object-to-formdata";
import omitEmpty from "omit-empty";
import { QUERY_KEYS } from "@/query-keys";
import type { TFormQuizQuestionSchema } from "../-types";

export const useUpdateQuestion = (quizId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-question", quizId],
    mutationFn: async (body: TFormQuizQuestionSchema) => {
      const { id, ...rest } = body;
      const data = omitEmpty({
        ...rest,
        image: typeof body.image === "string" ? undefined : body.image,
        multiselect: body.multiselect ? 1 : 0,
      });
      const payload = serialize(data, { indices: true });
      payload.append("_method", "PUT");

      return (
        await api.post(`/questions/${id}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      ).data;
    },
    onSuccess: (_, variables) => {
      toast.success("Question updated successfully!");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_QUESTIONS(quizId),
      });
      if (variables.id) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.GET_QUESTION(variables.id),
        });
      }
    },
    onError: (error) => {
      const fallback = "Failed to update question.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
