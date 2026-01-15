import { Controller } from "react-hook-form";
import type { FieldPath, FieldValues } from "react-hook-form";

import { Field, FieldDescription, FieldLabel, FieldContent } from "../ui/field";
import { Switch } from "../ui/switch";

import type { TFormController } from "@/types";

type TFormSwitchProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = TFormController<TFieldValues, TName, TTransformedValues> & {
  disabled?: boolean;
  label?: string;
  description?: string;
};

export const FormSwitch = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  name,
  control,
  disabled = false,
  label = "",
  description = "",
}: TFormSwitchProps<TFieldValues, TName, TTransformedValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value, onChange, name: fieldName } = field;
        const { invalid } = fieldState;
        return (
          <Field
            data-invalid={invalid}
            orientation="horizontal"
            className="w-full justify-between items-center"
          >
            <FieldContent>
              {Boolean(label) && (
                <FieldLabel htmlFor={fieldName} className="mb-0">
                  {label}
                </FieldLabel>
              )}
              {Boolean(description) && (
                <FieldDescription>{description}</FieldDescription>
              )}
            </FieldContent>
            <Switch
              id={fieldName}
              checked={value}
              onCheckedChange={onChange}
              disabled={disabled}
              aria-invalid={invalid}
            />
          </Field>
        );
      }}
    />
  );
};
