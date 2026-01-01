import { z } from "zod";

export const ResultPageSearchSchema = z.object({
  page: z.number().catch(1),
  per_page: z.number().catch(15),
  q: z.string().optional().catch(""),
});

export type TResultPageSearchSchema = z.infer<typeof ResultPageSearchSchema>;
