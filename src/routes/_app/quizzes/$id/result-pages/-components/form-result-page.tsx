import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ResultPageSchema, type TResultPageSchema } from "../-types";
import {
  useCreateResultPage,
  useGetResultPage,
  useUpdateResultPage,
} from "../-apis";
import { FormInput, FormSlider, FormTiptap } from "@/components/form";
import { CardContent, CardAction } from "@/components/ui/card";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import AppLoading from "@/components/base/app-loading";

import { useNavigate, useRouter } from "@tanstack/react-router";
import { DEFAULT_PAGINATION } from "@/consts";
import type { TFormType } from "@/types";

const ResultPageFormSchema = ResultPageSchema.omit({
  min_score: true,
  max_score: true,
}).extend({
  score_range: z.array(z.number()).length(2),
});

type TResultPageFormSchema = z.infer<typeof ResultPageFormSchema>;

type TProps = {
  form_data: { id?: string | number; type: TFormType; quizId: string | number };
};

export const FormResultPage = ({ form_data }: TProps) => {
  console.log("👉 ~ FormResultPage ~ form_data:", form_data);
  const router = useRouter();
  const navigate = useNavigate();
  const { id, type, quizId } = form_data;

  // Fetch existing result page
  const { data: resultPage, isLoading: isFetchLoading } = useQuery({
    ...useGetResultPage(id as string | number),
    enabled: !!id && type === "update",
  });

  const form = useForm<TResultPageFormSchema>({
    resolver: zodResolver(ResultPageFormSchema),
    defaultValues: {
      quiz_id: quizId,
      title: "",
      score_range: [0, 100],
      content: "",
    },
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  console.log("👉 ~ FormResultPage ~ errors:::", errors);

  useEffect(() => {
    if (type === "update" && resultPage) {
      reset({
        quiz_id: resultPage.quiz_id || quizId,
        title: resultPage.title || "",
        score_range: [resultPage.min_score || 0, resultPage.max_score || 100],
        content: resultPage.content || "",
      });
    }
  }, [resultPage, type, reset]);

  const { mutate: createResultPage, isPending: isCreating } =
    useCreateResultPage();
  const { mutate: updateResultPage, isPending: isUpdating } =
    useUpdateResultPage();

  const handelCancel = () => {
    router.history.back();
  };

  const onSubmit = (data: TResultPageFormSchema) => {
    const { score_range, ...rest } = data;
    const payload: TResultPageSchema = {
      ...rest,
      quiz_id: quizId,
      min_score: score_range[0],
      max_score: score_range[1],
    } as TResultPageSchema;

    if (type === "update" && id) {
      payload.id = id;
      updateResultPage(payload, {
        onSuccess: () => {
          navigate({
            to: "/quizzes/$id/result-pages/view/$resultID",
            params: { id: String(quizId), resultID: String(id) },
          });
        },
      });
    } else {
      createResultPage(payload, {
        onSuccess: (res) => {
          const resultID = res?.data?.id || res?.id;
          if (resultID) {
            navigate({
              to: "/quizzes/$id/result-pages/view/$resultID",
              params: { id: String(quizId), resultID: String(resultID) },
            });
          } else {
            navigate({
              to: "/quizzes/$id/result-pages",
              params: { id: String(quizId) },
              search: DEFAULT_PAGINATION,
            });
          }
        },
      });
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <CardContent className="flex-1 flex flex-col overflow-hidden">
      <form
        id="result-page-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 flex-1 overflow-y-auto p-1 pr-4"
      >
        {isFetchLoading ? (
          <AppLoading />
        ) : (
          <div className="grid gap-4">
            <FormInput
              name="title"
              control={control}
              label="Page Title"
              placeholder="e.g. High Score Result"
            />

            <FormSlider
              name="score_range"
              control={control}
              label="Score Range"
              min={0}
              max={100}
              step={1}
              description="Define the percentage range (0-100) for which this result page should be shown."
              formatValue={(vals) => `${vals[0]} - ${vals[1]}%`}
            />

            <FormTiptap
              name="content"
              control={control}
              label="Page Content"
              description="Design your result page content here."
              variant="advance"
            />
          </div>
        )}
      </form>

      <CardAction className="pt-4 w-full flex justify-end items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="min-w-36"
          disabled={isLoading}
          onClick={handelCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="result-page-form"
          loading={isLoading}
          className="min-w-36"
        >
          {type === "create" ? "Create Page" : "Update Page"}
        </Button>
      </CardAction>
    </CardContent>
  );
};
