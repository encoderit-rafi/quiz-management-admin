import { Controller } from "react-hook-form";
import type { FieldPath, FieldValues } from "react-hook-form";

import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Checkbox } from "../ui/checkbox";

import type { TFormController } from "@/types";

type TFormCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = TFormController<TFieldValues, TName, TTransformedValues> & {
  label?: string;
  description?: string;
  disabled?: boolean;
};

export const FormCheckbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  name,
  control,
  label = "",
  description = "",
  disabled = false,
}: TFormCheckboxProps<TFieldValues, TName, TTransformedValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value, onChange, onBlur, name: fieldName } = field;
        const { invalid, error } = fieldState;
        return (
          <Field
            data-invalid={invalid}
            orientation="horizontal"
            className="items-center"
          >
            <Checkbox
              id={fieldName}
              checked={value}
              onCheckedChange={onChange}
              onBlur={onBlur}
              aria-invalid={invalid}
              disabled={disabled}
            />
            <div className="flex flex-col gap-1">
              {Boolean(label) && (
                <FieldLabel htmlFor={fieldName} className="cursor-pointer">
                  {label}
                </FieldLabel>
              )}
              {Boolean(description) && !invalid && (
                <FieldDescription>{description}</FieldDescription>
              )}
              {invalid && <FieldError errors={[error]} />}
            </div>
          </Field>
        );
      }}
    />
  );
};
