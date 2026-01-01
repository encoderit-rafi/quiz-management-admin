import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ResultPageSchema, type TResultPageSchema } from "../-types";
import { useCreateResultPage, useUpdateResultPage } from "../-apis";
import { FormInput, FormTiptap } from "@/components/form";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardAction } from "@/components/ui/card";

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
  onCancel,
}: FormResultPageProps) => {
  const form = useForm<TResultPageSchema>({
    resolver: zodResolver(ResultPageSchema),
    defaultValues: initialData || {
      name: "",
      min_score: 0,
      max_score: 100,
      content: "",
    },
  });

  const { control, handleSubmit, watch, setValue } = form;
  const minScore = watch("min_score");
  const maxScore = watch("max_score");

  const { mutate: createResultPage, isPending: isCreating } =
    useCreateResultPage();
  const { mutate: updateResultPage, isPending: isUpdating } =
    useUpdateResultPage();

  const onSubmit = (data: TResultPageSchema) => {
    if (type === "update") {
      updateResultPage(data, { onSuccess });
    } else {
      createResultPage(data, { onSuccess });
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Card className="flex-1 flex flex-col overflow-hidden">
      <CardContent className="flex-1 flex flex-col gap-6 overflow-hidden pt-6">
        <form
          id="result-page-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 flex-1 overflow-y-auto pr-2"
        >
          <div className="grid gap-4">
            <FormInput
              name="name"
              control={control}
              label="Page Name"
              placeholder="e.g. High Score Result"
            />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Score Range</Label>
                <span className="text-sm text-muted-foreground font-mono">
                  {minScore} - {maxScore}%
                </span>
              </div>
              <div className="pt-2">
                <Controller
                  control={control}
                  name="min_score"
                  render={({ field: { value, onChange } }) => (
                    <Slider
                      defaultValue={[minScore, maxScore]}
                      max={100}
                      step={1}
                      value={[minScore, maxScore]}
                      onValueChange={(vals) => {
                        setValue("min_score", vals[0]);
                        setValue("max_score", vals[1]);
                      }}
                      className="py-4"
                    />
                  )}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Define the percentage range (0-100) for which this result page
                should be shown.
              </p>
            </div>

            <FormTiptap
              name="content"
              control={control}
              label="Page Content"
              description="Design your result page content here."
            />
          </div>
        </form>
      </CardContent>

      <CardAction className="flex justify-end gap-2 p-4 border-t bg-muted/50">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          type="button"
        >
          Cancel
        </Button>
        <Button type="submit" form="result-page-form" loading={isLoading}>
          {type === "create" ? "Create Page" : "Save Changes"}
        </Button>
      </CardAction>
    </Card>
  );
};
