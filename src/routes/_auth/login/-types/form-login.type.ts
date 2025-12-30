import * as z from "zod";

export const SchemaFormLogin = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password is too long"),
});
export type TFormLogin = z.infer<typeof SchemaFormLogin>;
export const DataFormLogin: TFormLogin = {
  email: "",
  password: "",
};
