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
import { FormInput, FormTiptap } from "@/components/form";
import { CardContent, CardAction } from "@/components/ui/card";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import AppLoading from "@/components/base/app-loading";

import { useNavigate, useRouter } from "@tanstack/react-router";
import { DEFAULT_PAGINATION } from "@/consts";
import type { TFormType } from "@/types";

const ResultPageFormSchema = ResultPageSchema.extend({
  min_score: z.coerce.number().min(0, "Min score must be 0 or greater"),
  max_score: z.coerce.number().min(0, "Max score must be 0 or greater"),
}).refine((data) => data.max_score > data.min_score, {
  message: "Max score must be greater than min score",
  path: ["max_score"],
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
    resolver: zodResolver(ResultPageFormSchema) as any,
    defaultValues: {
      quiz_id: quizId,
      title: "",
      min_score: 0,
      max_score: 100,
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
        min_score: resultPage.min_score || 0,
        max_score: resultPage.max_score || 100,
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
    const payload: TResultPageSchema = {
      ...data,
      quiz_id: quizId,
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

            <div className="space-y-2">
              <label className="text-sm font-medium">Score Range</label>
              <div className="flex">
                <FormInput
                  name="min_score"
                  control={control}
                  type="number"
                  placeholder="From"
                  className="rounded-e-none focus:z-10 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                />
                <FormInput
                  name="max_score"
                  control={control}
                  type="number"
                  placeholder="To"
                  className="-ms-px rounded-s-none focus:z-10 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Define the percentage range (0-100) for which this result page
                should be shown.
              </p>
            </div>

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
