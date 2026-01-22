import { api } from "@/axios";
import { QUERY_KEYS } from "@/query-keys";
import { queryOptions } from "@tanstack/react-query";
// import { TMeteSchema } from "@/types";
import type { TQuizSchema } from "../-types";
import type { TMetaSchema } from "@/types";

export const useGetAllQuizzes = (params?: any) => {
  return queryOptions({
    queryKey: QUERY_KEYS.GET_ALL_QUIZZES(params),
    queryFn: async (): Promise<{ data: TQuizSchema[]; meta: TMetaSchema }> => {
      const res = await api.get("/quizzes", {
        params: {
          order_by: "created_at",
          direction: "desc",
          ...params,
        },
      });
      return res.data.data;
    },
  });
};
