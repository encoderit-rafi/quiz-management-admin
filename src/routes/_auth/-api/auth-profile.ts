import { api } from "@/axios";
import { queryOptions } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/query-keys";

export const getAuthProfile = () => {
  return queryOptions({
    queryKey: QUERY_KEYS.GET_AUTH_PROFILE,
    queryFn: async () => (await api.get("/auth/profile")).data.data,
  });
};
