import { Controller } from "react-hook-form";
import type { FieldPath, FieldValues } from "react-hook-form";
import { Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";

import { Field, FieldError, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import type { TFormController } from "@/types"; // adjust path
import { ImagePreview } from "./image-preview";
import { cn, getImageUrl } from "@/utils";

type TFormImageUploadProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = TFormController<TFieldValues, TName, TTransformedValues> & {
  label?: string;
  description?: string;
};

export const FormImageUpload = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  name,
  control,
  label = "",
  description = "upload image here.",
}: TFormImageUploadProps<TFieldValues, TName, TTransformedValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value, onChange } = field;
        const { invalid, error } = fieldState;
        const [previewUrl, setPreviewUrl] = useState<string | null>(null);

        useEffect(() => {
          if ((value as any) instanceof File) {
            const url = URL.createObjectURL(value);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
          } else if (typeof value === "string") {
            setPreviewUrl(getImageUrl(value));
          } else {
            setPreviewUrl(null);
          }
        }, [value]);

        return (
          <Field data-invalid={invalid}>
            {Boolean(label) && <FieldLabel>{label}</FieldLabel>}

            <div className="space-y-2 h-full">
              <label
                className={cn(
                  "flex flex-col gap-4 items-center justify-center text-muted-foreground w-full h-full aspect-video rounded-md cursor-pointer hover:bg-accent/50 transition-colors overflow-hidden",
                  {
                    "border-dashed border": !previewUrl,
                  }
                )}
              >
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  disabled={Boolean(previewUrl)}
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    onChange(file);
                  }}
                />
                {previewUrl ? (
                  <div className="relative w-full h-full">
                    <ImagePreview src={previewUrl} alt={`${label} preview`} />
                    <Button
                      type="button"
                      // variant="destructive"
                      size="icon"
                      className="absolute bg-red-500/80 text-white hover:bg-red-500 top-2 right-2 rounded-full size-6 transition-colors"
                      onClick={() => onChange(null)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="size-5 shrink-0" />
                    <p className="text-sm text-center whitespace-nowrap truncate max-w-full">
                      {description}
                    </p>
                  </>
                )}
              </label>
            </div>

            {invalid && <FieldError errors={[error]} />}
          </Field>
        );
      }}
    />
  );
};
