import { z } from "zod";

export const StatisticsSchema = z.object({
  views: z.number(),
  starts: z.number(),
  completions: z.number(),
  drop_off_rate: z.number(), // Percentage (0-100)
  avg_time: z.string(), // Formatted string e.g. "2m 30s"
  conversion_rate: z.number(), // Percentage (0-100)
});

export type TStatisticsSchema = z.infer<typeof StatisticsSchema>;
