import { DEFAULT_PAGINATION } from "@/consts";
import { z } from "zod";

export const SearchSchema = z.object({
  page: z.number().catch(DEFAULT_PAGINATION.page),
  per_page: z.number().catch(DEFAULT_PAGINATION.per_page),
});
export type TSearch = z.infer<typeof SearchSchema>;
