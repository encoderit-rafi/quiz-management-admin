import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  QuizFormSchema,
  type TQuizFormSchema,
  // type TQuizSchema,
} from "../-types";
import { useCreateQuiz, useGetQuiz, useUpdateQuiz } from "../-apis";

import { useQuery } from "@tanstack/react-query";
import {
  FormInput,
  FormTiptap,
  FormImageUpload,
  FormColorPicker,
  FormTextarea,
} from "@/components/form";
import { CardAction, CardContent } from "@/components/ui/card";
import { DEFAULT_QUIZ_DATA } from "../-data";

type TProps = {
  form_data: { id: string | number; type: string };
  onSuccess: () => void;
  onCancel: () => void;
};

export default function FormQuiz({ form_data, onSuccess, onCancel }: TProps) {
  const { id, type } = form_data;

  // Fetch existing quiz
  const { data: quiz } = useQuery({
    ...useGetQuiz(id),
    enabled: !!id && type === "update",
  });

  // Form Setup
  const form = useForm<TQuizFormSchema>({
    resolver: zodResolver(QuizFormSchema),
    defaultValues: DEFAULT_QUIZ_DATA,
  });

  const { reset, control, handleSubmit } = form;

  // Format API Data
  // const formatter = (data: TQuizSchema): TQuizFormSchema => ({
  //   id: data.id ?? undefined,
  //   title: data.title ?? "",
  //   quiz_name: data.quiz_name ?? "",
  //   heading: data.heading ?? "",
  //   cta_text: data.cta_text ?? "",
  //   footer_text: data.footer_text ?? "",
  //   description: data.description ?? "",
  //   logo: data.logo ?? null,
  //   background_image: data.background_image ?? null,
  //   primary_color: data.primary_color ?? "#ffffff",
  //   secondary_color: data.secondary_color ?? "#ffffff",
  //   is_active: data.is_active ?? true,
  // });

  useEffect(() => {
    if (type === "update" && quiz) {
      // const formattedData = formatter(quiz);
      reset(quiz);
    }
  }, [quiz, type, reset]);

  // Mutations
  const { mutate: createQuiz, isPending: isPendingCreate } = useCreateQuiz();
  const { mutate: updateQuiz, isPending: isPendingUpdate } = useUpdateQuiz();

  // Submit
  const onSubmit = (data: TQuizFormSchema) => {
    if (type === "update") {
      updateQuiz(data, {
        onSuccess: () => {
          onSuccess();
          reset();
        },
      });
    } else {
      createQuiz(data, {
        onSuccess: () => {
          onSuccess();
          reset();
        },
      });
    }
  };

  return (
    <>
      <CardContent className="flex-1 flex flex-col overflow-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 flex-1 overflow-y-auto p-1 pr-4"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  bg-muted/5">
              <FormInput
                name="quiz_name"
                control={control}
                label="Quiz Name"
                placeholder="Enter quiz name"
              />
              <FormInput
                name="title"
                control={control}
                label="Title"
                placeholder="Enter quiz title"
              />

              <FormInput
                name="heading"
                control={control}
                label="Heading"
                placeholder="Enter heading"
              />

              <FormInput
                name="cta_text"
                control={control}
                label="CTA Text"
                placeholder="Enter CTA text"
              />
              <FormImageUpload
                name="logo"
                control={control}
                label="Logo"
                description="Upload logo here."
              />

              <FormImageUpload
                name="background_image"
                control={control}
                label="Background Image"
                description="Upload background image here."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  bg-muted/5">
              <FormColorPicker
                control={control}
                name="primary_color"
                label="Primary Color"
                placeholder="#3b82f6"
                defaultColor="#3b82f6"
              />
              <FormColorPicker
                name="secondary_color"
                control={control}
                label="Secondary Color"
                placeholder="#8b5cf6"
                defaultColor="#8b5cf6"
              />
            </div>
            <FormTextarea
              name="description"
              control={control}
              label="Description"
              placeholder="Enter description"
            />
            <FormTiptap
              name="footer_text"
              control={control}
              label="Footer Text"
            />
          </div>
        </form>
        <CardAction className="pt-4 w-full flex justify-end items-center gap-2">
          <Button
            type="button"
            variant="outline"
            className="min-w-36"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="min-w-36"
            onClick={handleSubmit(onSubmit)}
            loading={isPendingCreate || isPendingUpdate}
          >
            {type === "update" ? "Update" : "Create"}
          </Button>
        </CardAction>
      </CardContent>
    </>
  );
}
