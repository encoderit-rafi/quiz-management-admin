import { DEFAULT_PAGINATION } from "@/consts";
import { z } from "zod";

export const ResultPageSearchSchema = z.object({
  page: z.number().catch(DEFAULT_PAGINATION.page),
  per_page: z.number().catch(DEFAULT_PAGINATION.per_page),
  search: z.string().optional().catch(""),
});

export type TResultPageSearchSchema = z.infer<typeof ResultPageSearchSchema>;
