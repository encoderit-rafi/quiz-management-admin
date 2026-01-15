import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";

export const useArrangeOrder = (
  model_name: "Question" | "Answer",
  onSuccess?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["arrange-order", model_name],
    mutationFn: async (items: (string | number)[]) => {
      const payload = { items };
      return (await api.post(`/arrange-order/${model_name}`, payload)).data;
    },
    onSuccess: () => {
      toast.success(`${model_name} order updated successfully!`);
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      const fallback = `Failed to update ${model_name.toLowerCase()} order.`;
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
