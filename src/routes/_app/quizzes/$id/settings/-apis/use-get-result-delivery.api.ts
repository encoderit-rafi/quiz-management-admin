import { api } from "@/axios";
import { QUERY_KEYS } from "@/query-keys";
import { queryOptions } from "@tanstack/react-query";
import type { TResultDeliveryResponse } from "../-types";

export const useGetResultDelivery = (quizId: string | number) => {
  return queryOptions({
    queryKey: QUERY_KEYS.GET_RESULT_DELIVERY_SETTINGS(quizId),
    queryFn: async () => {
      const res = await api.get(`/quiz/${quizId}/result-delivery-settings`);
      return res.data?.data as TResultDeliveryResponse;
    },
    enabled: !!quizId,
  });
};
