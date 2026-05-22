import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { QUERY_KEYS } from "@/query-keys";

export const useDeleteRule = (resultPageId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ruleId: number) =>
      api.delete(`/result-pages/${resultPageId}/rules/${ruleId}`),
    onSuccess: () => {
      toast.success("Rule deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_RESULT_PAGE_RULES(resultPageId),
      });
    },
    onError: (error) => {
      const fallback = "Failed to delete rule.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
