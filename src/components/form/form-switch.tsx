import { Controller } from "react-hook-form";
import type { FieldPath, FieldValues } from "react-hook-form";

import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Switch } from "../ui/switch";

import type { TFormController } from "@/types";

type TFormSwitchProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = TFormController<TFieldValues, TName, TTransformedValues> & {
  label?: string;
  description?: string;
  disabled?: boolean;
};

export const FormSwitch = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  name,
  control,
  label = "",
  description = "",
  disabled = false,
}: TFormSwitchProps<TFieldValues, TName, TTransformedValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value, onChange, name: fieldName } = field;
        const { invalid, error } = fieldState;
        return (
          <Field
            data-invalid={invalid}
            orientation="horizontal"
            className="w-fit"
          >
            {/* {Boolean(label) && (
              <FieldLabel htmlFor={fieldName} className="cursor-pointer">
                {label}
              </FieldLabel>
            )} */}
            <Switch
              id={fieldName}
              checked={value}
              onCheckedChange={onChange}
              disabled={disabled}
              aria-invalid={invalid}
            />
            {/* {Boolean(description) && !invalid && (
              <FieldDescription>{description}</FieldDescription>
            )}
            {invalid && <FieldError errors={[error]} />} */}
          </Field>
        );
      }}
    />
  );
};
