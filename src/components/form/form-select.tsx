import { Controller } from "react-hook-form";
import type { FieldPath, FieldValues } from "react-hook-form";

import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import type { TFormController } from "@/types";

type TFormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = TFormController<TFieldValues, TName, TTransformedValues> & {
  label?: string;
  description?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
};

export const FormSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  name,
  control,
  label = "",
  description = "",
  placeholder = "Select an option",
  options,
}: TFormSelectProps<TFieldValues, TName, TTransformedValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { onChange, name: fieldName } = field;
        console.log("👉 ~ FormSelect ~ field:", field);
        const { invalid, error } = fieldState;
        return (
          <Field data-invalid={invalid}>
            {Boolean(label) && (
              <FieldLabel htmlFor={fieldName}>{label}</FieldLabel>
            )}
            {Boolean(description) && (
              <FieldDescription>{description}</FieldDescription>
            )}
            <Select {...field} onValueChange={onChange}>
              <SelectTrigger id={fieldName} aria-invalid={invalid}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {invalid && error?.message && (
              <FieldError>{error.message}</FieldError>
            )}
          </Field>
        );
      }}
    />
  );
};
