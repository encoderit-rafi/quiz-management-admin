import { api } from "@/axios";
import { queryOptions } from "@tanstack/react-query";
import type { TLeadResultSchema } from "../-types";

export const useGetLeadByID = (id: string | number, params?: any) => {
  return queryOptions({
    queryKey: ["lead", id, params],
    enabled: !!id,
    queryFn: async (): Promise<TLeadResultSchema> => {
      const response = await api.get(`/quiz-submissions/${id}`, { params });
      return response.data?.data;
    },
  });
};
