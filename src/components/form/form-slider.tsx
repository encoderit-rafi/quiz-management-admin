import { Controller } from "react-hook-form";
import type { FieldPath, FieldValues } from "react-hook-form";

import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Slider } from "../ui/slider";

import type { TFormController } from "@/types";

type TFormSliderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = TFormController<TFieldValues, TName, TTransformedValues> & {
  label?: string;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number[];
  showValue?: boolean;
  formatValue?: (value: number[]) => string;
};

export const FormSlider = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  name,
  control,
  label = "",
  description = "",
  min = 0,
  max = 100,
  step = 1,
  defaultValue = [0, 100],
  showValue = true,
  formatValue,
}: TFormSliderProps<TFieldValues, TName, TTransformedValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value, onChange } = field;
        const { invalid, error } = fieldState;

        const displayValue = formatValue
          ? formatValue(value || defaultValue)
          : `${(value || defaultValue)[0]} - ${(value || defaultValue)[1]}`;

        return (
          <Field data-invalid={invalid}>
            {Boolean(label) && (
              <div className="flex justify-between items-center">
                <FieldLabel>{label}</FieldLabel>
                {showValue && (
                  <span className="text-sm text-muted-foreground font-mono">
                    {displayValue}
                  </span>
                )}
              </div>
            )}
            <div className="pt-2">
              <Slider
                defaultValue={defaultValue}
                min={min}
                max={max}
                step={step}
                value={value || defaultValue}
                onValueChange={onChange}
                className="py-4"
                aria-invalid={invalid}
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
