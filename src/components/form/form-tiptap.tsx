import { Controller } from "react-hook-form";
import type { FieldPath, FieldValues } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import type { TFormController } from "@/types";
import {
  Tiptap,
  Toolbar,
  Editor,
  Bold,
  Italic,
  Strikethrough,
  TextType,
  BulletList,
  Columns,
  CTAButton,
  Link,
  OrderedList,
  HorizontalRule,
  Image,
  Table,
  TaskList,
  Undo,
  Redo,
  HardBreak,
  Underline,
  Highlight,
  BubbleMenu,
} from "../tiptap";

type TFormTiptapProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = TFormController<TFieldValues, TName, TTransformedValues> & {
  label?: string;
  description?: string;
  defaultValue?: string;
  variant?: "simple" | "advance";
};

export const FormTiptap = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  name,
  control,
  label = "",
  description = "",
  defaultValue = "",
  variant = "simple",
}: TFormTiptapProps<TFieldValues, TName, TTransformedValues>) => {
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
            <Tiptap
              value={value}
              onChange={onChange}
              defaultValue={defaultValue}
            >
              <Toolbar className="flex-wrap h-auto gap-2 divide-x">
                <div className="flex items-center gap-1 pr-2 mr-1">
                  <Bold />
                  <Italic />
                  <Underline />
                  <Highlight />
                  <Link />
                  <Strikethrough />
                  <HardBreak />
                  <HorizontalRule />
                </div>

                <div className="flex items-center gap-1 pr-2 mr-1">
                  <TextType />
                </div>

                {variant === "advance" && (
                  <>
                    <div className="flex items-center gap-1 pr-2 mr-1">
                      <BulletList />
                      <OrderedList />
                      <TaskList />
                    </div>

                    <div className="flex items-center gap-1 pr-2 mr-1">
                      <Image />
                      <Columns />
                      <CTAButton />
                      <Table />
                    </div>
                  </>
                )}

                <div className="flex items-center gap-1">
                  <Undo />
                  <Redo />
                </div>
              </Toolbar>
              <BubbleMenu>
                <Toolbar className="flex-wrap h-auto gap-2 divide-x bg-background border rounded-md shadow mx-2">
                  <div className="flex items-center gap-1 pr-2 mr-1">
                    <Bold />
                    <Italic />
                    <Underline />
                    <Highlight />
                    <Link />
                    <Strikethrough />
                  </div>

                  <div className="flex items-center gap-1 pr-2 mr-1">
                    <TextType />
                  </div>
                </Toolbar>
              </BubbleMenu>
              <Editor />
            </Tiptap>
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
