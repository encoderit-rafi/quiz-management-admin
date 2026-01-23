import { api } from "@/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { serialize } from "object-to-formdata";

export const useUploadImage = () => {
  return useMutation({
    mutationKey: ["upload-image"],
    mutationFn: async (file: File) => {
      const payload = serialize({ image: file });

      const response = await api.post("/images", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    },
    onError: (error) => {
      const fallback = "Failed to upload image.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
