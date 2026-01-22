import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormCheckbox, FormSwitch } from "@/components/form";
import { FormLeadSchema, type TFormLeadSchema } from "../-types";
import { CardAction } from "@/components/ui/card";
import { useGetLeadSettings, useUpdateLeadSettings } from "../-apis";
import { DEFAULT_LEAD_OPTIONS } from "../-data";
import { Label } from "@/components/ui/label";
import AppLoading from "@/components/base/app-loading";

type TProps = {
  quizId: string | number;
};

export default function FormLead({ quizId }: TProps) {
  const {
    data: settings,
    isLoading,
    isFetching,
  } = useQuery(useGetLeadSettings(quizId));
  const { mutate: updateSettings, isPending } = useUpdateLeadSettings(quizId);

  const form = useForm<TFormLeadSchema>({
    resolver: zodResolver(FormLeadSchema),
    defaultValues: {
      quiz_id: quizId,
      fields: DEFAULT_LEAD_OPTIONS,
    },
  });
  console.log("👉 ~ FormLead ~ DEFAULT_LEAD_OPTIONS:", DEFAULT_LEAD_OPTIONS);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;
  console.log("👉 ~ FormLead ~ errors:", errors);
  const { fields: formFields } = useFieldArray({
    control,
    name: "fields",
  });

  useEffect(() => {
    if (settings && settings.fields) {
      const fields = DEFAULT_LEAD_OPTIONS.map((option) => {
        const state = settings.fields.find(
          (f: { field_name: string }) => f.field_name === option.field_name,
        );
        return {
          ...option,
          // enabled: state ? state.enabled : option.enabled,
          enabled: state ? state.enabled : option.enabled,
          required: state ? state.required : option.required,
        };
      });
      reset({
        id: settings.id || "",
        quiz_id: quizId,
        fields,
      });
    }
  }, [settings, isLoading, isFetching, reset, quizId]);

  const onSubmit = (data: TFormLeadSchema) => {
    updateSettings(data);
  };
  const loading = isLoading || isFetching;
  if (loading) return <AppLoading />;

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-5xl"
      >
        <Table className="border rounded-lg">
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Field Name</TableHead>
              <TableHead className="text-end">Required</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formFields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <div className="hidden">
                    <input
                      {...control.register(`fields.${index}.field_name`)}
                    />
                    <input {...control.register(`fields.${index}.label`)} />
                    <input {...control.register(`fields.${index}.type`)} />
                  </div>
                  <Label
                    htmlFor={`fields.${index}.enabled`}
                    className="flex items-center gap-2"
                  >
                    <FormCheckbox
                      control={control}
                      name={`fields.${index}.enabled`}
                    />
                    {field.label}
                  </Label>
                </TableCell>

                <TableCell>
                  <FormSwitch
                    control={control}
                    name={`fields.${index}.required`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <CardAction className="flex justify-end pt-4">
          <Button type="submit" loading={isPending} className="min-w-36">
            Save
          </Button>
        </CardAction>
      </form>
    </div>
  );
}
