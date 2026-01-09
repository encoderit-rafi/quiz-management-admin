import { TFileSchema } from "@/types";
import { z } from "zod";

export const OptionSchema = z.object({
  label: z.string().min(1, { message: "Option label is required" }),
  points: z.number().min(0, { message: "Points must be at least 0" }),
});

export const FormQuizQuestionSchema = z.object({
  name: z.string().min(1, { message: "Question name is required" }),
  question_image: TFileSchema.optional().nullable(),
  options: z
    .array(OptionSchema)
    .min(1, { message: "At least one option is required" }),
});

export type TFormQuizQuestionSchema = z.infer<typeof FormQuizQuestionSchema>;
