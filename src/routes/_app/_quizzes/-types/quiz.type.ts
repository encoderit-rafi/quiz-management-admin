import { TFileSchema } from "@/types";
import { z } from "zod";

// Quiz Schema
export const QuizSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  title: z.string(),
  quiz_name: z.string().optional(),
  heading: z.string().optional(),
  cta_text: z.string().optional(),
  footer_text: z.string().optional(),
  description: z.string().nullable().optional(),
  logo: TFileSchema.nullable().optional(),
  background_image: TFileSchema.nullable().optional(),
  primary_color: z.string().optional(),
  secondary_color: z.string().optional(),
  is_active: z.boolean().optional(),
  questions: z.array(z.any()).optional(),
});

// Type inference
export type TQuizSchema = z.infer<typeof QuizSchema>;
