import type { TQuizSettingsSchema } from "../-types";

export const DEFAULT_QUIZ_SETTINGS_DATA: TQuizSettingsSchema = {
  quiz_id: undefined,
  lead_form: {
    email: { enabled: false, required: false },
    phone: { enabled: false, required: false },
    address: { enabled: false, required: false },
    zip: { enabled: false, required: false },
  },
  result_delivery: {
    email: false,
    pdf: false,
    link: false,
  },
};
