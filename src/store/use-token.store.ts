import { create } from "zustand";
import { persist } from "zustand/middleware";

type TProps = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const useToken = create<TProps>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
    }),
    {
      name: "auth-token", // storage key
      partialize: (state) => ({ token: state.token }), // persist only token
    }
  )
);
