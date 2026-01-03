import { z } from "zod";

export const LeadFormFieldSchema = z.object({
  enabled: z.boolean().default(false),
  required: z.boolean().default(false),
});

export const QuizSettingsSchema = z.object({
  quiz_id: z.union([z.string(), z.number()]).optional(),
  lead_form: z
    .object({
      email: LeadFormFieldSchema,
      phone: LeadFormFieldSchema,
      address: LeadFormFieldSchema,
      zip: LeadFormFieldSchema,
    })
    .refine(
      (data) => {
        // At least one field must be enabled
        return (
          data.email.enabled ||
          data.phone.enabled ||
          data.address.enabled ||
          data.zip.enabled
        );
      },
      {
        message: "At least one lead form field must be enabled",
      }
    ),
  result_delivery: z
    .object({
      email: z.boolean().default(false),
      pdf: z.boolean().default(false),
      link: z.boolean().default(false),
    })
    .refine(
      (data) => {
        // At least one field must be enabled
        return data.email || data.pdf || data.link;
      },
      {
        message: "At least one result delivery field must be enabled",
      }
    ),
});

export type TQuizSettingsSchema = z.infer<typeof QuizSettingsSchema>;
