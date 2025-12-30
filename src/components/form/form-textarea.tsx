import { Controller } from "react-hook-form";
import type { FieldPath, FieldValues } from "react-hook-form";

import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";

import type { TFormController } from "@/types"; // adjust path
import { Textarea } from "../ui/textarea";

type TFormTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = TFormController<TFieldValues, TName, TTransformedValues> & {
  label?: string;
  placeholder?: string;
  description?: string;
};

export const FormTextarea = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  name,
  control,
  label = "",
  placeholder = "",
  description = "",
}: TFormTextareaProps<TFieldValues, TName, TTransformedValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { name } = field;
        const { invalid, error } = fieldState;
        return (
          <Field data-invalid={invalid}>
            {Boolean(label) && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
            <Textarea
              id={name}
              {...field}
              placeholder={placeholder}
              rows={4}
              value={field.value ?? ""}
              aria-invalid={invalid}
            />
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
