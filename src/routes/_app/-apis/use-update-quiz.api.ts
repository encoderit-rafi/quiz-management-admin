import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { serialize } from "object-to-formdata";
import omitEmpty from "omit-empty";
import type { TFormQuizSchema } from "../-types";
import { QUERY_KEYS } from "@/query-keys";

export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-quiz"],
    mutationFn: (body: TFormQuizSchema | FormData) => {
      // If body already is FormData, send directly
      if (body instanceof FormData) {
        const id = body.get("id");
        return api.post(`/quizzes/${id}`, body, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      const { id, ...rest } = body;

      // Format fields & remove empty values
      const data = omitEmpty({
        ...rest,
        is_active: body.is_active ? 1 : 0,
      });

      // Convert to FormData if there are files
      const hasFiles =
        data.logo instanceof File || data.background_image instanceof File;
      const payload = hasFiles ? serialize(data) : data;

      return api.post(`/quizzes/${id}`, payload, {
        headers: hasFiles
          ? { "Content-Type": "multipart/form-data" }
          : undefined,
      });
    },
    onSuccess: (_, body) => {
      const id = body instanceof FormData ? body.get("id") : body.id;
      toast.success("Quiz updated successfully!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GET_ALL_QUIZZES() });
      if (id) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.GET_QUIZ(id as string),
        });
      }
    },
    onError: (error) => {
      const fallback = "Failed to update quiz.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
