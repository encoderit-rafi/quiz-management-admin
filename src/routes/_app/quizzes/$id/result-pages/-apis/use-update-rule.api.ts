import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { QUERY_KEYS } from "@/query-keys";
import type { TResultPageRuleForm } from "./use-create-rule.api";

export const useUpdateRule = (resultPageId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TResultPageRuleForm }) =>
      api.put(`/result-pages/${resultPageId}/rules/${id}`, data),
    onSuccess: () => {
      toast.success("Rule updated successfully!");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_RESULT_PAGE_RULES(resultPageId),
      });
    },
    onError: (error) => {
      const fallback = "Failed to update rule.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
