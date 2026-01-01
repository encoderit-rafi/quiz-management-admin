import { z } from "zod";

export const LeadResultSchema = z.object({
  id: z.union([z.string(), z.number()]),
  quiz_title: z.string(),
  user_email: z.string().optional(),
  submission_date: z.string(),
  total_score: z.number(),
  result_page: z.object({
    name: z.string(),
    min: z.number(),
    max: z.number(),
  }),
  answers: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
      points: z.number(),
    })
  ),
});

export type TLeadResultSchema = z.infer<typeof LeadResultSchema>;
