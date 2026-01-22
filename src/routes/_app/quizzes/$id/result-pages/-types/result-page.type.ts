import { z } from "zod";

export const ResultPageSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  quiz_id: z.union([z.string(), z.number()]),
  title: z.string().min(1, "Title is required"),
  min_score: z.number().min(0, "Min score must be 0 or greater"),
  max_score: z.number().min(0, "Max score must be 0 or greater"),
  content: z.string().optional(),
});

export type TResultPageSchema = z.infer<typeof ResultPageSchema>;
