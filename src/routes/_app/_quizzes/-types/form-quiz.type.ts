import { TFileSchema } from "@/types";
import { z } from "zod";

export const FormQuizSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  title: z.string().min(1, { message: "Title is required" }),
  quiz_name: z.string().min(1, { message: "Quiz name is required" }),
  heading: z.string().min(1, { message: "Heading is required" }),
  cta_text: z.string().min(1, { message: "CTA text is required" }),
  footer_text: z.string().min(1, { message: "Footer text is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  logo: TFileSchema.nullable(),
  background_image: TFileSchema.nullable(),
  primary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Invalid color format. Use hex color (e.g., #FF5733)",
  }),
  secondary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Invalid color format. Use hex color (e.g., #FF5733)",
  }),
  is_active: z.boolean(),
});

export type TFormQuizSchema = z.infer<typeof FormQuizSchema>;

// export const QuizQuestionsSchema = z.object({
//   questions: z.array(QuestionSchema),
// });

// export type TQuizQuestionsSchema = z.infer<typeof QuizQuestionsSchema>;
// export type TQuestionSchema = z.infer<typeof QuestionSchema>;
