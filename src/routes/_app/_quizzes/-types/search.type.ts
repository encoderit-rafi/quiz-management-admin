import { z } from "zod";

export const SearchSchema = z.object({
  page: z.number().catch(1),
  per_page: z.number().catch(15),
});

export type TSearchSchema = z.infer<typeof SearchSchema>;
