import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { QUERY_KEYS } from "@/query-keys";

export const useArrangeResultPageOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["arrange-order", "ResultPage"],
    mutationFn: async (items: (string | number)[]) => {
      const payload = { items };
      return (await api.post("/arrange-order/ResultPage", payload)).data;
    },
    onSuccess: () => {
      toast.success("Result page order updated successfully!");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_RESULT_PAGES({}),
      });
    },
    onError: (error) => {
      const fallback = "Failed to update result page order.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
