import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import type { TFormResultDeliverySchema } from "../-types";

export const useGetResultDelivery = (quizId: string | number) => {
  return {
    queryKey: ["result-delivery", quizId],
    queryFn: async () => {
      const res = await api.get(`/quiz/${quizId}/result-delivery-settings`);
      return res.data?.data;
    },
    enabled: !!quizId,
  };
};

export const useUpdateResultDelivery = (quizId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-result-delivery", quizId],
    mutationFn: async (body: TFormResultDeliverySchema) => {
      const res = await api.put(
        `/quiz/${quizId}/result-delivery-settings`,
        body
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Result delivery settings updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["result-delivery", quizId] });
    },
    onError: (error) => {
      const fallback = "Failed to update result delivery settings.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
