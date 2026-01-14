import { api } from "@/axios";
import { QUERY_KEYS } from "@/query-keys";
import { queryOptions } from "@tanstack/react-query";
// import { TMeteSchema } from "@/types";
import type { TQuizSchema } from "../-types";
import type { TMeteSchema } from "@/types";

export const useGetAllQuizzes = (params?: any) => {
  return queryOptions({
    queryKey: QUERY_KEYS.GET_ALL_QUIZZES(),
    queryFn: async (): Promise<{ data: TQuizSchema[]; meta: TMeteSchema }> => {
      const { data } = (await api.get("/quizzes", { params })).data;
      return data;
    },
  });
};
