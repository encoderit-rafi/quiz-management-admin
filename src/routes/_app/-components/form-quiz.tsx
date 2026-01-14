import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormQuizSchema, type TFormQuizSchema } from "../-types";
import { useCreateQuiz, useGetQuiz, useUpdateQuiz } from "../-apis";

import { useQuery } from "@tanstack/react-query";
import {
  FormInput,
  FormTiptap,
  FormImageUpload,
  FormColorPicker,
  FormTextarea,
  FormSwitch,
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
  const form = useForm<TFormQuizSchema>({
    resolver: zodResolver(FormQuizSchema),
    defaultValues: DEFAULT_QUIZ_DATA,
  });

  const { reset, control, handleSubmit } = form;

  // Format API Data
  useEffect(() => {
    if (type === "update" && quiz) {
      reset({
        id: quiz.id,
        name: quiz.name,
        title: quiz.title,
        heading: quiz.heading,
        cta_text: quiz.cta_text,
        landing_page_text: quiz.landing_page_text,
        description: quiz.description,
        is_active: Boolean(quiz.is_active),
        embed_code: quiz.embed_code,
        logo: quiz.logo,
        background_image: quiz.background_image,
        primary_color: quiz.primary_color,
        secondary_color: quiz.secondary_color,
      });
    }
  }, [quiz, type, reset]);

  // Mutations
  const { mutate: createQuiz, isPending: isPendingCreate } = useCreateQuiz();
  const { mutate: updateQuiz, isPending: isPendingUpdate } = useUpdateQuiz();

  // Submit
  const onSubmit = (data: TFormQuizSchema) => {
    if (type === "update") {
      updateQuiz(data, {
        onSuccess: () => {
          onSuccess();
          reset(DEFAULT_QUIZ_DATA);
        },
      });
    } else {
      createQuiz(data, {
        onSuccess: () => {
          onSuccess();
          reset(DEFAULT_QUIZ_DATA);
        },
      });
    }
  };

  return (
    <CardContent className="flex-1 flex flex-col overflow-hidden">
      <form
        onSubmit={handleSubmit(onSubmit as any)}
        className="space-y-6 flex-1 overflow-y-auto p-1 pr-4"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4  bg-muted/5">
            <FormInput
              name="name"
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
            name="landing_page_text"
            control={control}
            label="Landing Page Text"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSwitch
              name="is_active"
              control={control}
              label="Is Active"
              description="Whether this quiz is currently active and accessible."
            />
            <FormTextarea
              name="embed_code"
              control={control}
              label="Embed Code"
              placeholder="Enter embed code if available"
            />
          </div>
        </div>
      </form>
      <CardAction className="pt-4 w-full flex justify-end items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="min-w-36"
          disabled={isPendingCreate || isPendingUpdate}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="min-w-36"
          onClick={handleSubmit(onSubmit as any)}
          loading={isPendingCreate || isPendingUpdate}
        >
          {type === "update" ? "Update" : "Create"}
        </Button>
      </CardAction>
    </CardContent>
  );
}
