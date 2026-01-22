import { DEFAULT_PAGINATION } from "@/consts";
import { z } from "zod";

export const LeadSearchSchema = z.object({
  page: z.number().catch(DEFAULT_PAGINATION.page),
  per_page: z.number().catch(DEFAULT_PAGINATION.per_page),
  search: z.string().optional().catch(""),
});

export type TLeadSearchSchema = z.infer<typeof LeadSearchSchema>;
