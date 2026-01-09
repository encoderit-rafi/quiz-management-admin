import { DEFAULT_PAGINATION } from "@/consts";
import { z } from "zod";

export const SearchSchema = z.object({
  page: z.number().catch(DEFAULT_PAGINATION.page),
  per_page: z.number().catch(DEFAULT_PAGINATION.per_page),
  q: z.string().optional().catch(""),
});

export type TSearchSchema = z.infer<typeof SearchSchema>;
