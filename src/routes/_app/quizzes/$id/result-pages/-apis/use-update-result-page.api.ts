import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import type { TResultPageSchema } from "../-types";
import omitEmpty from "omit-empty";
import { QUERY_KEYS } from "@/query-keys";

export const useUpdateResultPage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: TResultPageSchema) => {
      const data = omitEmpty(body);
      const payload = data.id ? { ...data, _method: "PUT" } : data;
      return (await api.post(`/result-pages/${body.id}`, payload)).data;
    },
    onSuccess: (_, variables) => {
      toast.success("Result page updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["get-result-pages"] });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_RESULT_PAGE(variables.id as string | number),
      });
    },
    onError: (error) => {
      const fallback = "Failed to update result page.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
