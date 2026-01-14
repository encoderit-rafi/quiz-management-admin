import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import type { TFormQuizSchema } from "../-types";
import { QUERY_KEYS } from "@/query-keys";
import { serialize } from "object-to-formdata";
import omitEmpty from "omit-empty";
export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-quiz"],
    mutationFn: (body: TFormQuizSchema | FormData) => {
      const data = omitEmpty({
        ...body,
      }) as TFormQuizSchema;

      // Convert to FormData if there are files
      const hasFiles =
        data.logo instanceof File || data.background_image instanceof File;
      const payload = hasFiles ? serialize(data) : data;

      return api.post("/quizzes", payload, {
        headers: hasFiles
          ? { "Content-Type": "multipart/form-data" }
          : undefined,
      });
    },
    onSuccess: () => {
      toast.success("Quiz created successfully!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GET_ALL_QUIZZES() });
    },
    onError: (error) => {
      const fallback = "Failed to create quiz.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
