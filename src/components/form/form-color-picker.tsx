import { Controller } from "react-hook-form";
import type { FieldPath, FieldValues } from "react-hook-form";

import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import type { TFormController } from "@/types"; // adjust path

type TFormColorPickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = TFormController<TFieldValues, TName, TTransformedValues> & {
  label?: string;
  placeholder?: string;
  description?: string;
  defaultColor?: string;
};

export const FormColorPicker = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  name,
  control,
  label = "",
  placeholder = "#000000",
  description = "",
  defaultColor = "#000000",
}: TFormColorPickerProps<TFieldValues, TName, TTransformedValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { name, value, onChange } = field;
        const { invalid, error } = fieldState;
        const colorValue = value || defaultColor;

        return (
          <Field data-invalid={invalid}>
            {Boolean(label) && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={colorValue}
                onChange={(e) => onChange(e.target.value)}
                className="h-full w-16 cursor-pointer"
              />
              <Input
                {...field}
                id={name}
                value={value || ""}
                placeholder={placeholder}
                aria-invalid={invalid}
                className="flex-1"
              />
            </div>
            {Boolean(description) && !invalid && (
              <FieldDescription>{description}</FieldDescription>
            )}
            {invalid && <FieldError errors={[error]} />}
          </Field>
        );
      }}
    />
  );
};
