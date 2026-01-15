import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import type { TFormLeadSchema } from "../-types";
import { QUERY_KEYS } from "@/query-keys";
import omitEmpty from "omit-empty";

export const useUpdateLeadSettings = (quizId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-lead-settings", quizId],
    mutationFn: async (body: TFormLeadSchema) => {
      const data = omitEmpty(body);
      const payload = data.id ? { ...data, _method: "PUT" } : data;
      const res = await api.post(`/quiz/${quizId}/lead-form-settings`, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Lead form settings updated successfully!");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_LEAD_SETTINGS(quizId),
      });
    },
    onError: (error) => {
      const fallback = "Failed to update lead settings.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
