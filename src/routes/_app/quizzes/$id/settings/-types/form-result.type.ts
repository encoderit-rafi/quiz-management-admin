import { z } from "zod";

export const FormResultDeliverySchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  quiz_id: z.union([z.string(), z.number()]),
  enable_email_result: z.boolean(),
  enable_pdf_download: z.boolean(),
  enable_link_share: z.boolean(),
  result_page_position: z.enum(["before", "after"], {
    message: "Result page position is required",
  }),
});

export type TFormResultDeliverySchema = z.infer<
  typeof FormResultDeliverySchema
>;

export type TResultDeliveryResponse = {
  id: string | number;
  quiz_id: string | number;
  enable_email_result: boolean | number;
  enable_pdf_download: boolean | number;
  enable_link_share: boolean | number;
  result_page_position: "before" | "after";
};
