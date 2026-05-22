import { useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  FormSelect,
} from "@/components/form";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import AppLoading from "@/components/base/app-loading";

import { DEFAULT_QUIZ_DATA } from "../-data";
import type { TFormType } from "@/types";
import { useNavigate, useRouter } from "@tanstack/react-router";
type TProps = {
  form_data: { id: string | number; type: TFormType };
};

export default function FormQuiz({ form_data }: TProps) {
  const { t } = useTranslation();
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
    resolver: zodResolver(FormQuizSchema) as any,
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
  const onSubmit = (data: any) => {
    if (type === "update") {
      updateQuiz(data, {
        // onSuccess: () => {
        //   navigate({ to: "/quizzes/$id/view", params: { id: String(id) } });
        //   reset(DEFAULT_QUIZ_DATA);
        // },
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
    <Card className="max-w-6xl mx-auto w-full flex-1 min-h-0">
      <CardHeader>
        <CardTitle>
          {type === "update" ? t("navigation.editQuiz") : t("quizzes.addQuiz")}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto min-h-0">
        <form
          id="create-quiz-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {isFetchLoading ? (
            <AppLoading />
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect
                  name="scoring_mode"
                  control={control}
                  label="Scoring Mode"
                  options={[
                    { value: "total", label: "Total Score (default)" },
                    { value: "category", label: "Category-Based" },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  required
                  name="name"
                  control={control}
                  label={t("quizzes.tableName")}
                  placeholder={t("quizzes.form.quizNamePlaceholder")}
                />
                <FormInput
                  required
                  name="title"
                  control={control}
                  label={t("quizzes.tableTitle")}
                  placeholder={t("quizzes.form.titlePlaceholder")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  required
                  name="heading"
                  control={control}
                  label={t("quizzes.details.heading")}
                  placeholder={t("quizzes.form.headingPlaceholder")}
                />
                <FormInput
                  required
                  name="cta_text"
                  control={control}
                  label={t("quizzes.details.ctaText")}
                  placeholder={t("quizzes.form.ctaTextPlaceholder")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  required
                  name="submit_button_text"
                  control={control}
                  label={t("quizzes.details.submitButtonText")}
                  placeholder={t("quizzes.form.submitButtonTextPlaceholder")}
                />
                <FormInput
                  required
                  name="result_button_text"
                  control={control}
                  label={t("quizzes.details.resultButtonText")}
                  placeholder={t("quizzes.form.resultButtonTextPlaceholder")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormImageUpload
                  required
                  name="logo"
                  control={control}
                  label={t("quizzes.details.logo")}
                  description={t("quizzes.form.logoDescription")}
                />
                <FormImageUpload
                  required
                  name="background_image"
                  control={control}
                  label={t("quizzes.details.background")}
                  description={t("quizzes.form.backgroundDescription")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormColorPicker
                  required
                  control={control}
                  name="primary_color"
                  label={t("quizzes.details.primaryColor")}
                  placeholder="#3b82f6"
                  defaultColor="#3b82f6"
                />
                <FormColorPicker
                  required
                  name="secondary_color"
                  control={control}
                  label={t("quizzes.details.secondaryColor")}
                  placeholder="#8b5cf6"
                  defaultColor="#8b5cf6"
                />
              </div>

              <FormTextarea
                required
                name="description"
                control={control}
                label={t("quizzes.tableDescription")}
                placeholder={t("quizzes.form.descriptionPlaceholder")}
              />

              <FormTiptap
                required
                name="landing_page_text"
                control={control}
                label={t("quizzes.details.footerText")}
              />
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-end items-center gap-2 border-t pt-6">
        <Button
          type="button"
          variant="outline"
          className="min-w-36"
          disabled={isPendingCreate || isPendingUpdate}
          onClick={handelCancel}
        >
          {t("common.cancel")}
        </Button>
        <Button
          form="create-quiz-form"
          type="submit"
          className="min-w-36"
          loading={isPendingCreate || isPendingUpdate}
        >
          {type === "update" ? t("common.update") : t("common.create")}
        </Button>
      </CardFooter>
    </Card>
  );
}
