import { z } from "zod";

const FileSchema = typeof File !== "undefined" ? z.instanceof(File) : z.any();

// Quiz Schema
export const QuizSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  title: z.string(),
  quiz_name: z.string().optional(),
  heading: z.string().optional(),
  cta_text: z.string().optional(),
  footer_text: z.string().optional(),
  description: z.string().nullable().optional(),
  logo: z.union([FileSchema, z.string(), z.null()]).optional(),
  background_image: z.union([FileSchema, z.string(), z.null()]).optional(),
  primary_color: z.string().optional(),
  secondary_color: z.string().optional(),
  is_active: z.boolean().optional(),
});

// Type inference
export type TQuizSchema = z.infer<typeof QuizSchema>;
