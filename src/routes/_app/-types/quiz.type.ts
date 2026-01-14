import { z } from "zod";

// Quiz Schema
export const QuizSchema = z.object({
  id: z.number(),
  uuid: z.uuid(),

  name: z.string(),
  title: z.string(),
  heading: z.string(),
  description: z.string(),

  landing_page_text: z.string(), // HTML string
  cta_text: z.string(),

  background_image: z.string().url(),
  logo: z.string().url(),

  primary_color: z.string(), // hex color
  secondary_color: z.string(), // hex color

  is_active: z.boolean(),

  views: z.string(), // comes as string from API

  client_id: z.number().nullable(),
  embed_code: z.string().nullable(),
});

// Type inference
export type TQuizSchema = z.infer<typeof QuizSchema>;
