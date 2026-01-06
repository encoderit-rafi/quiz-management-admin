import { z } from "zod";

export const FileSchema =
  typeof File !== "undefined" ? z.instanceof(File) : z.any();

export const TFileSchema = z.union([FileSchema, z.string()]);

export type TFileSchemaType = z.infer<typeof TFileSchema>;
