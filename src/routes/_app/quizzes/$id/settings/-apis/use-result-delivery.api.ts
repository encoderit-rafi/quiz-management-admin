import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import type { TFormResultDeliverySchema } from "../-types";
import { QUERY_KEYS } from "@/query-keys";
import omitEmpty from "omit-empty";

export const useUpdateResultDelivery = (quizId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-result-delivery", quizId],
    mutationFn: async (body: TFormResultDeliverySchema) => {
      const data = omitEmpty(body);
      const payload = data.id ? { ...data, _method: "PUT" } : data;
      const res = await api.post(
        `/quiz/${quizId}/result-delivery-settings`,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Result delivery settings updated successfully!");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_RESULT_DELIVERY_SETTINGS(quizId),
      });
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
