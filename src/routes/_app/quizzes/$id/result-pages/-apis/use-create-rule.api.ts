import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { QUERY_KEYS } from "@/query-keys";

export type TResultPageRuleForm = {
  priority?: number;
  rule_type: string;
  category_id?: number | null;
  threshold?: number | null;
};

export const useCreateRule = (resultPageId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: TResultPageRuleForm) =>
      api.post(`/result-pages/${resultPageId}/rules`, body),
    onSuccess: () => {
      toast.success("Rule created successfully!");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_RESULT_PAGE_RULES(resultPageId),
      });
    },
    onError: (error) => {
      const fallback = "Failed to create rule.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
