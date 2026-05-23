import { z } from "zod";

export const ResultPageSearchSchema = z.object({
  page: z.number().optional().catch(undefined),
  per_page: z.number().optional().catch(undefined),
  search: z.string().optional().catch(""),
  quiz_id: z.string().optional().catch(""),
});

export type TResultPageSearchSchema = z.infer<typeof ResultPageSearchSchema>;
