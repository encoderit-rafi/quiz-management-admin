import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

export type TFormState = {
  type: "default" | "create" | "read" | "update" | "delete";
  title: string;
  description: string;
  id: string | number;
};

export type TFormController<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = {
  name: TName;
  control: ControllerProps<TFieldValues, TName, TTransformedValues>["control"];
};
