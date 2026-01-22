import { z } from "zod";
export const LeadFieldSchema = z.discriminatedUnion("field_name", [
  z.object({
    field_name: z.literal("email"),
    label: z.literal("Email"),
    enabled: z.boolean(),
    required: z.boolean(),
    type: z.literal("email"),
  }),
  z.object({
    field_name: z.literal("phone"),
    label: z.literal("Phone"),
    enabled: z.boolean(),
    required: z.boolean(),
    type: z.literal("text"),
  }),
  z.object({
    field_name: z.literal("zip"),
    label: z.literal("Zip Code"),
    enabled: z.boolean(),
    required: z.boolean(),
    type: z.literal("number"),
  }),
  z.object({
    field_name: z.literal("address"),
    label: z.literal("Address"),
    enabled: z.boolean(),
    required: z.boolean(),
    type: z.literal("text"),
  }),
]);

export const FormLeadSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  quiz_id: z.union([z.string(), z.number()]),
  fields: z.array(LeadFieldSchema),
});

export type TFormLeadSchema = z.infer<typeof FormLeadSchema>;
export type TLeadFieldSchema = z.infer<typeof LeadFieldSchema>;
