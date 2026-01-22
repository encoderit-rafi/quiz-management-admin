import { TFileSchema } from "@/types";
import { z } from "zod";

export const AnswerOptionSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  answer_text: z.string().min(1, { message: "Option label is required" }),
  points: z.coerce.number().min(0, { message: "Points must be at least 0" }),
});

export const FormQuizQuestionSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  question_text: z.string().min(1, { message: "Question name is required" }),
  image: TFileSchema.optional().nullable(),
  // is_active: z.boolean(),
  multiselect: z.boolean(),
  answers: z
    .array(AnswerOptionSchema)
    .min(1, { message: "At least one option is required" }),
});

export type TFormQuizQuestionSchema = z.infer<typeof FormQuizQuestionSchema>;
