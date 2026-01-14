import { api } from "@/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useToken } from "@/store";
// import { useNavigate } from "@tanstack/react-router";
import type { TFormLogin } from "../-types";
// import { DEFAULT_PAGINATION } from "@/consts";
import axios from "axios";
import { DEFAULT_PAGINATION } from "@/consts";
import { useNavigate } from "@tanstack/react-router";

export const useLogin = () => {
  const { setToken } = useToken();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["/login"],
    mutationFn: (body: TFormLogin) => api.post("/auth/login", body),
    onSuccess: (res) => {
      const {
        data: {
          data: { token },
        },
      } = res;
      setToken(token);
      navigate({ to: "/", replace: true, search: DEFAULT_PAGINATION });
      toast.success("Logged in successfully!");
    },
    onError: (err) => {
      console.error("👉 ~ useLogin ~ err:", err);
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });
};
