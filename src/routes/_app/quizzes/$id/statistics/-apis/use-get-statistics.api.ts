import { queryOptions } from "@tanstack/react-query";
import type { TStatisticsSchema } from "../-types";
import {api} from "@/axios.ts";

// Mock data generator based on ID to simulate different stats
const generateMockStats = (id: string | number): TStatisticsSchema => {
  const numericId = Number(id) || 1;
  const multiplier = (numericId % 5) + 1; // 1 to 5

  const views = 1000 * multiplier;
  const starts = Math.floor(views * 0.6);
  const completions = Math.floor(starts * 0.8);

  return {
    views,
    starts,
    completions,
    drop_off_rate: Math.floor(Math.random() * 20) + 10, // 10-30%
    avg_time: `${Math.floor(Math.random() * 5) + 1}m ${Math.floor(Math.random() * 60)}s`,
    conversion_rate: Math.floor((completions / views) * 100),
  };
};

export const useGetStatistics = (quizId?: string | number) => {
  return queryOptions({
    queryKey: ["leads", quizId],
    queryFn: async () => {
      // In a real app this would be: await api.get("/leads", { params });
      // For now we will rely on demo data injection similarly to others if API fails
      try {
        const { data } = await api.get(`/quiz-statistics/detailed/${quizId}`);
        return data.data || data;
      } catch (e) {
        return null; // Return null so we can fall back to demo data
      }
    },
    enabled: !!quizId,
  });
};
