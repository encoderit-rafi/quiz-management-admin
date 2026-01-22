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
} from "@/components/form";
import { CardAction, CardContent } from "@/components/ui/card";
import AppLoading from "@/components/base/app-loading";

import { DEFAULT_QUIZ_DATA } from "../-data";
import type { TFormType } from "@/types";
import { useNavigate, useRouter } from "@tanstack/react-router";
type TProps = {
  form_data: { id: string | number; type: TFormType };
};

export default function FormQuiz({ form_data }: TProps) {
  const router = useRouter();
  const navigate = useNavigate();
  const { id, type } = form_data;
  // Fetch existing quiz
  const { data: quiz, isLoading: isFetchLoading } = useQuery({
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
      reset(quiz);
    }
  }, [quiz, type, reset]);

  // Mutations
  const { mutate: createQuiz, isPending: isPendingCreate } = useCreateQuiz();
  const { mutate: updateQuiz, isPending: isPendingUpdate } = useUpdateQuiz();
  //Cancel
  const handelCancel = () => {
    router.history.back();
  };
  // Submit
  const onSubmit = (data: TFormQuizSchema) => {
    if (type === "update") {
      updateQuiz(data, {
        onSuccess: () => {
          navigate({ to: "/quizzes/$id/view", params: { id: String(id) } });
          reset(DEFAULT_QUIZ_DATA);
        },
      });
    } else {
      createQuiz(data, {
        onSuccess: (res) => {
          navigate({
            to: "/quizzes/$id/view",
            params: { id: String(res?.data?.data?.id) },
          });
          reset(DEFAULT_QUIZ_DATA);
        },
      });
    }
  };

  return (
    <CardContent className="flex-1 flex flex-col overflow-hidden">
      <form
        id="create-quiz-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 flex-1 overflow-y-auto p-1 pr-4"
      >
        {isFetchLoading ? (
          <AppLoading />
        ) : (
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
              <FormInput
                name="submit_button_text"
                control={control}
                label="Submit Button Text"
                placeholder="Enter submit button text"
              />
              <FormInput
                name="result_button_text"
                control={control}
                label="Result Button Text"
                placeholder="Enter result button text"
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
              label="Footer Text"
            />
          </div>
        )}
      </form>

      <CardAction className="pt-4 w-full flex justify-end items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="min-w-36"
          disabled={isPendingCreate || isPendingUpdate}
          onClick={handelCancel}
        >
          Cancel
        </Button>
        <Button
          form="create-quiz-form"
          type="submit"
          className="min-w-36"
          loading={isPendingCreate || isPendingUpdate}
        >
          {type === "update" ? "Update" : "Create"}
        </Button>
      </CardAction>
    </CardContent>
  );
}
