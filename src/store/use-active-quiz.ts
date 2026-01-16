import { create } from "zustand";
import { persist } from "zustand/middleware";

type TActiveQuiz = {
  quiz: { id: string | number; name: string };
};

type TActiveQuizStore = {
  activeQuiz: TActiveQuiz;
  setActiveQuiz: (quiz: TActiveQuiz) => void;
  clearActiveQuiz: () => void;
};

export const useActiveQuiz = create<TActiveQuizStore>()(
  persist(
    (set) => ({
      activeQuiz: { quiz: { id: "", name: "" } },
      setActiveQuiz: (quiz: TActiveQuiz) => set({ activeQuiz: quiz }),
      clearActiveQuiz: () =>
        set({ activeQuiz: { quiz: { id: "", name: "" } } }),
    }),
    {
      name: "active-Quiz-storage",
    }
  )
);
