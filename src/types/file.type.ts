import { z } from "zod";

export const FileSchema =
  typeof File !== "undefined" ? z.instanceof(File) : z.any();

export type TFileSchema = z.infer<typeof FileSchema>;
