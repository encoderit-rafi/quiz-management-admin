import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ResultPageSchema, type TResultPageSchema } from "../-types";
import { useCreateResultPage, useUpdateResultPage } from "../-apis";
import { FormInput, FormSlider, FormTiptap } from "@/components/form";
import { CardContent, CardAction } from "@/components/ui/card";
import { z } from "zod";

const ResultPageFormSchema = ResultPageSchema.omit({
  min_score: true,
  max_score: true,
}).extend({
  score_range: z.array(z.number()).length(2),
});

type TResultPageFormSchema = z.infer<typeof ResultPageFormSchema>;

interface FormResultPageProps {
  initialData?: TResultPageSchema;
  type?: "create" | "update";
  onSuccess: () => void;
  onCancel: () => void;
}

export const FormResultPage = ({
  initialData,
  type = "create",
  onSuccess,
}: FormResultPageProps) => {
  const form = useForm<TResultPageFormSchema>({
    resolver: zodResolver(ResultPageFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      score_range: [initialData?.min_score || 0, initialData?.max_score || 100],
      content: initialData?.content || "",
    },
  });

  const { control, handleSubmit } = form;

  const { mutate: createResultPage, isPending: isCreating } =
    useCreateResultPage();
  const { mutate: updateResultPage, isPending: isUpdating } =
    useUpdateResultPage();

  const onSubmit = (data: TResultPageFormSchema) => {
    const { score_range, ...rest } = data;
    const payload: TResultPageSchema = {
      ...rest,
      min_score: score_range[0],
      max_score: score_range[1],
    } as TResultPageSchema;

    if (type === "update" && initialData?.id) {
      payload.id = initialData.id;
      updateResultPage(payload, { onSuccess });
    } else {
      createResultPage(payload, { onSuccess });
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
        <div className="grid gap-4">
          <FormInput
            name="name"
            control={control}
            label="Page Name"
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
      </form>
      <CardAction className="pt-4 w-full flex justify-end items-center gap-2">
        <Button type="submit" form="result-page-form" loading={isLoading}>
          {type === "create" ? "Create Page" : "Save Changes"}
        </Button>
      </CardAction>
    </CardContent>
  );
};
