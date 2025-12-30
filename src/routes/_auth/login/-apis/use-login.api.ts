import { api } from "@/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useToken } from "@/store";
import { useNavigate } from "@tanstack/react-router";
import type { TFormLogin } from "../-types";

export const useLogin = () => {
  const { setToken } = useToken();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["/login"],
    mutationFn: (body: TFormLogin) => api.post("/login", body),
    onSuccess: (res) => {
      const {
        data: { token },
      } = res;
      console.log("👉 ~ useLogin ~ token:", token);

      setToken(token);
      navigate({ to: "/", replace: true });
      toast.success("Logged in successfully!");
    },
  });
};
