import { api } from "@/axios";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type TForgotPasswordBody = {
  email: string;
  redirect_url: string;
};

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: ["/password/forgot"],
    mutationFn: (body: TForgotPasswordBody) =>
      api.post("/password/forgot", body),

    onSuccess: () => {
      toast.success("Check Your Email Please!");
    },
  });
};
