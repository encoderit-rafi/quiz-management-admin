import { api } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";

export const useDeleteResultPage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string | number) => {
      return (await api.delete(`/result-pages/${id}`)).data;
    },
    onSuccess: () => {
      toast.success("Result page deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["get-result-pages"] });
    },
    onError: (error) => {
      const fallback = "Failed to delete result page.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
