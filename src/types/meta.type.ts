import { z } from "zod";

export const MeteSchema = z.object({
  current_page: z.number(),
  first_page_url: z.string().url(),
  from: z.number().nullable(),
  last_page: z.number(),
  last_page_url: z.string().url(),
  next_page_url: z.string().url().nullable(),
  path: z.string().url(),
  per_page: z.number(),
  prev_page_url: z.string().url().nullable(),
  to: z.number().nullable(),
  total: z.number(),
});

export type TMeteSchema = z.infer<typeof MeteSchema>;
