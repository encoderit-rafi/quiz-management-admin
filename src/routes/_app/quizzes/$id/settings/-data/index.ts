export * from "./lead-options.data";
import type { TFormResultDeliverySchema } from "../-types";

export const DEFAULT_RESULT_DELIVERY_DATA = (
  quizId: string | number
): TFormResultDeliverySchema => ({
  quiz_id: quizId,
  enable_email_result: false,
  enable_pdf_download: false,
  enable_link_share: false,
});
