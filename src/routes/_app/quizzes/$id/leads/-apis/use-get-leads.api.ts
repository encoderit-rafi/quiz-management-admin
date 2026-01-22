import { api } from "@/axios";
import { queryOptions } from "@tanstack/react-query";
import type { TMetaSchema } from "@/types";
import type { TLeadResultSchema } from "../-types";

export const useGetLeads = (params?: any) => {
  return queryOptions({
    queryKey: ["leads", params],
    queryFn: async (): Promise<{
      data: TLeadResultSchema[];
      meta: TMetaSchema;
    }> => {
      const response = await api.get("/quiz-submissions", { params });
      return response.data?.data;
    },
  });
};
