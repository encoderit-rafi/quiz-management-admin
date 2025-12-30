import { z } from "zod";

const FileSchema = typeof File !== "undefined" ? z.instanceof(File) : z.any();

export const QuizFormSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  title: z.string().min(1, { message: "Title is required" }),
  quiz_name: z.string().min(1, { message: "Quiz name is required" }),
  heading: z.string().min(1, { message: "Heading is required" }),
  cta_text: z.string().min(1, { message: "CTA text is required" }),
  footer_text: z.string().min(1, { message: "Footer text is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  logo: z.union([FileSchema, z.string()], {
    message: "Logo is required",
  }),
  background_image: z.union([FileSchema, z.string()], {
    message: "Background image is required",
  }),
  primary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Invalid color format. Use hex color (e.g., #FF5733)",
  }),
  secondary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Invalid color format. Use hex color (e.g., #FF5733)",
  }),
  is_active: z.boolean(),
});

export type TQuizFormSchema = z.infer<typeof QuizFormSchema>;
