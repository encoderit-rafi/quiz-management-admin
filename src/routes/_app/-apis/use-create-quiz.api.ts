import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import type { TFormQuizSchema } from "../-types";
import { QUERY_KEYS } from "@/query-keys";

const toFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "boolean") {
        formData.append(key, value ? "1" : "0");
      } else {
        formData.append(key, String(value));
      }
    }
  });
  return formData;
};

const omitEmpty = (obj: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, v]) => v !== null && v !== undefined && v !== ""
    )
  );
};

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-quiz"],
    mutationFn: (body: TFormQuizSchema | FormData) => {
      const data = omitEmpty({
        ...body,
      });

      // Convert to FormData if there are files
      const hasFiles =
        data.logo instanceof File || data.background_image instanceof File;
      const payload = hasFiles ? toFormData(data) : data;

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
