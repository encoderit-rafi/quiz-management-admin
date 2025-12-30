import { z } from "zod";

export const LeadFormFieldSchema = z.object({
  enabled: z.boolean().default(false),
  required: z.boolean().default(false),
});

export const QuizSettingsSchema = z.object({
  lead_form: z.object({
    email: LeadFormFieldSchema,
    phone: LeadFormFieldSchema,
    address: LeadFormFieldSchema,
    zip: LeadFormFieldSchema,
  }),
  result_delivery: z.object({
    email: z.boolean().default(false),
    pdf: z.boolean().default(false),
    link: z.boolean().default(false),
  }),
});

export type TQuizSettingsSchema = z.infer<typeof QuizSettingsSchema>;
