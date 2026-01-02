import { api } from "@/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useToken } from "@/store";
import { useNavigate } from "@tanstack/react-router";
import type { TFormLogin } from "../-types";
import { DEFAULT_PAGINATION } from "@/consts";

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
      setToken(token);
      navigate({ to: "/", replace: true, search: DEFAULT_PAGINATION });
      toast.success("Logged in successfully!");
    },
  });
};
