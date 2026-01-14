import { z } from "zod";

export const FormResultDeliverySchema = z.object({
  quiz_id: z.union([z.string(), z.number()]),
  enable_email_result: z.boolean(),
  enable_pdf_download: z.boolean(),
  enable_link_share: z.boolean(),
});

export type TFormResultDeliverySchema = z.infer<
  typeof FormResultDeliverySchema
>;
