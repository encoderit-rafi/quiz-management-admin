import { create } from "zustand";
import { persist } from "zustand/middleware";

type TProps = {
  user: string | null;
  setUser: (user: string | null) => void;
  clearUser: () => void;
};

export const useCurrentUser = create<TProps>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth-user", // storage key
      partialize: (state) => ({ user: state.user }), // persist only token
    }
  )
);
