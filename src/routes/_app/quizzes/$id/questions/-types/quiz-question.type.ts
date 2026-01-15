import { z } from "zod";

export const QuizAnswerSchema = z.object({
  id: z.number(),
  question_id: z.union([z.string(), z.number()]),
  answer_text: z.string(),
  points: z.number(),
  order: z.number(),
});

export type TQuizAnswer = z.infer<typeof QuizAnswerSchema>;

export const QuizQuestionSchema = z.object({
  id: z.number(),
  quiz_id: z.union([z.string(), z.number()]),
  question_text: z.string(),
  image: z.string().nullable(),
  order: z.number(),
  is_active: z.union([z.boolean(), z.number()]), // Allow number for API flags (0/1)
  answers: z.array(QuizAnswerSchema),
});

export type TQuizQuestion = z.infer<typeof QuizQuestionSchema>;
