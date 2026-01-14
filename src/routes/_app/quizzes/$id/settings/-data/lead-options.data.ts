import type { TFormLeadSchema, TLeadFieldSchema } from "../-types";

export const DEFAULT_LEAD_OPTIONS: TLeadFieldSchema[] = [
  {
    field_name: "email",
    label: "Email",
    enabled: false,
    required: true,
    type: "email",
  },
  {
    field_name: "phone",
    label: "Phone",
    enabled: false,
    required: false,
    type: "text",
  },
  {
    field_name: "zip",
    label: "Zip Code",
    enabled: false,
    required: true,
    type: "number",
  },
  {
    field_name: "address",
    label: "Address",
    enabled: false,
    required: true,
    type: "text",
  },
];
export const DEFAULT_LEAD_FORM_DATA: TFormLeadSchema = {
  id: "",
  quiz_id: "",
  fields: DEFAULT_LEAD_OPTIONS,
};
