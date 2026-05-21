import { z } from "zod";

export const QuizCategoryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9_-]+$/,
      "Slug must contain only lowercase letters, numbers, dashes, or underscores",
    ),
  order: z.coerce.number().min(0).optional(),
});

export type TQuizCategoryFormSchema = z.infer<typeof QuizCategoryFormSchema>;
