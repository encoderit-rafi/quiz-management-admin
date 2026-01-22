import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

export type TFormType = "default" | "create" | "read" | "update" | "delete";
export type TFormState = {
  type: TFormType;
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
