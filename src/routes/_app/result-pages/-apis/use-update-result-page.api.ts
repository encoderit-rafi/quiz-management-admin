import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import type { TResultPageSchema } from "../-types";

export const useUpdateResultPage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: TResultPageSchema) => {
      return (await api.put(`/result-pages/${body.id}`, body)).data;
    },
    onSuccess: () => {
      toast.success("Result page updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["result-pages"] });
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
