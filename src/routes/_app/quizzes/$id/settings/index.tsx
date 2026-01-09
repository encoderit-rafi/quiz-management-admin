import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, CardAction } from "@/components/ui/card";
import { useGetQuizSettings, useUpdateQuizSettings } from "../../../-apis";
// import { FormQuizSettings } from "../../../-components";
import { FormCheckbox, FormSwitch } from "@/components/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_QUIZ_SETTINGS_DATA } from "../../../-data";
import { QuizSettingsSchema, type TQuizSettingsSchema } from "../../../-types";
import { useEffect } from "react";
import AppCardHeaderWithBackButton from "@/components/base/app-card-header-with-back-button";
import {
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { DEFAULT_PAGINATION } from "@/consts";
import { useSetRoute } from "@/hooks/use-set-route";

export const Route = createFileRoute("/_app/quizzes/$id/settings/")({
  component: QuizSettingsPage,
});

function QuizSettingsPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const leadFormFields = [
    { name: "email", label: "Email" },
    { name: "phone", label: "Phone" },
    { name: "address", label: "Address" },
    { name: "zip", label: "Zip Code" },
  ] as const;

  const resultDeliveryFields = [
    { name: "email", label: "Email" },
    { name: "pdf", label: "PDF" },
    { name: "link", label: "Link" },
  ] as const;
  const { data: settings, isLoading: isFetching } = useQuery(
    useGetQuizSettings(id)
  );
  const { mutate: updateSettings, isPending: isUpdating } =
    useUpdateQuizSettings(id);
  const form = useForm<TQuizSettingsSchema>({
    resolver: zodResolver(QuizSettingsSchema) as any,
    defaultValues: settings || DEFAULT_QUIZ_SETTINGS_DATA,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;
  console.log("👉 ~ QuizSettingsPage ~ errors:", errors);
  const onSubmit = (data: any) => {
    updateSettings(data, {
      onSuccess: () => {
        navigate({ to: "/", search: DEFAULT_PAGINATION });
      },
    });
  };
  useSetRoute({ name: "Quiz Settings", path: Route.fullPath });

  useEffect(() => {
    if (settings) {
      reset(settings);
    }
  }, [settings, reset]);
  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      {isFetching ? (
        <div className="flex items-center justify-center p-12">
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      ) : (
        <CardContent className="flex-1 flex flex-col overflow-hidden">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 flex-1 overflow-y-auto"
          >
            <FieldGroup>
              {/* Lead Form Section */}
              <FieldSet>
                <FieldContent>
                  <FieldLegend>Lead Form</FieldLegend>
                  <FieldError errors={[errors.lead_form]} />
                </FieldContent>
                <FieldGroup data-slot="checkbox-group">
                  {leadFormFields.map((field) => {
                    // const isEnabled = watch(`lead_form.${field.name}.enabled`);
                    return (
                      <div
                        key={field.name}
                        className="flex items-center gap-2 justify-between max-w-xs"
                      >
                        <FormCheckbox
                          control={control}
                          name={`lead_form.${field.name}.enabled`}
                          label={field.label}
                        />
                        <FormSwitch
                          control={control}
                          name={`lead_form.${field.name}.required`}
                          label="Required"
                          // disabled={!isEnabled}
                        />
                      </div>
                    );
                  })}
                </FieldGroup>
              </FieldSet>

              <FieldSeparator />
              {/* Result Delivery Section */}
              <FieldSet>
                <FieldContent>
                  <FieldLegend>Result Delivery</FieldLegend>
                  <FieldError errors={[errors.result_delivery]} />
                </FieldContent>
                <FieldGroup data-slot="checkbox-group">
                  {resultDeliveryFields.map((field) => {
                    // const isEnabled = watch(`lead_form.${field.name}.enabled`);
                    return (
                      <div key={field.name}>
                        <FormCheckbox
                          control={control}
                          name={`result_delivery.${field.name}`}
                          label={field.label}
                        />
                      </div>
                    );
                  })}
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </form>
          <CardAction className="pt-4 w-full flex justify-end items-center gap-2">
            <Button
              type="button"
              className="min-w-36"
              onClick={handleSubmit(onSubmit)}
              loading={isUpdating}
            >
              Save Settings
            </Button>
          </CardAction>
        </CardContent>
      )}
    </div>
  );
}
