import { Controller } from "react-hook-form";
import type { FieldPath, FieldValues } from "react-hook-form";

import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Toggle } from "../ui/toggle";

import type { TFormController } from "@/types";

type TFormToggleProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = TFormController<TFieldValues, TName, TTransformedValues> & {
  label?: string;
  description?: string;
  disabled?: boolean;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  onLabel?: string;
  offLabel?: string;
};

export const FormToggle = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  name,
  control,
  label = "",
  description = "",
  variant = "outline",
  size = "sm",
  onLabel = "On",
  offLabel = "Off",
  disabled = false,
}: TFormToggleProps<TFieldValues, TName, TTransformedValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value, onChange, name: fieldName } = field;
        const { invalid, error } = fieldState;
        return (
          <Field data-invalid={invalid}>
            {Boolean(label) && (
              <FieldLabel htmlFor={fieldName}>{label}</FieldLabel>
            )}
            <Toggle
              id={fieldName}
              pressed={value}
              onPressedChange={onChange}
              variant={variant}
              size={size}
              aria-invalid={invalid}
              className="w-fit"
              disabled={disabled}
            >
              {value ? onLabel : offLabel}
            </Toggle>
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
