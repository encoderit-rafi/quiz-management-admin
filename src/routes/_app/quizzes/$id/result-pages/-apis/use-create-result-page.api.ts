import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import type { TResultPageSchema } from "../-types";

export const useCreateResultPage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: TResultPageSchema) => {
      return (await api.post("/result-pages", body)).data;
    },
    onSuccess: () => {
      toast.success("Result page created successfully!");
      queryClient.invalidateQueries({ queryKey: ["get-result-pages"] });
    },
    onError: (error) => {
      const fallback = "Failed to create result page.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
