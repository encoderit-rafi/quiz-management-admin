import { queryOptions } from "@tanstack/react-query";
import type { TStatisticsSchema } from "../-types";

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
    queryKey: ["statistics", quizId],
    queryFn: async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (!quizId) return null;
      return generateMockStats(quizId);
    },
    enabled: !!quizId,
  });
};
