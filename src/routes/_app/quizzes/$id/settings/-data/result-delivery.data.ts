import type { TFormResultDeliverySchema } from "../-types";

export const DEFAULT_RESULT_DELIVERY_DATA: TFormResultDeliverySchema = {
  id: "",
  quiz_id: "",
  enable_email_result: false,
  enable_pdf_download: false,
  enable_link_share: false,
};
