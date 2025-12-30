import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormCheckbox, FormSwitch } from "@/components/form";
import { CardContent, CardAction } from "@/components/ui/card";
import { QuizSettingsSchema, type TQuizSettingsSchema } from "../-types";

interface FormQuizSettingsProps {
  initialData?: TQuizSettingsSchema;
  onSubmit: (data: TQuizSettingsSchema) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const DEFAULT_VALUES: TQuizSettingsSchema = {
  lead_form: {
    email: { enabled: false, required: false },
    phone: { enabled: false, required: false },
    address: { enabled: false, required: false },
    zip: { enabled: false, required: false },
  },
  result_delivery: {
    email: false,
    pdf: false,
    link: false,
  },
};

export const FormQuizSettings = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: FormQuizSettingsProps) => {
  const form = useForm<TQuizSettingsSchema>({
    resolver: zodResolver(QuizSettingsSchema) as any,
    defaultValues: initialData || DEFAULT_VALUES,
  });

  const { control, handleSubmit, watch } = form;

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

  return (
    <>
      <CardContent className="flex-1 flex flex-col overflow-hidden">
        <form
          onSubmit={handleSubmit(onSubmit as any)}
          className="space-y-8 flex-1 overflow-y-auto"
        >
          {/* Lead Form Section */}
          <section className="space-y-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold">Lead Form</h2>
              {/* <p className="text-sm text-muted-foreground">
                Configure which fields to collect from leads and their
                requirement status.
              </p> */}
            </div>
            <div className="grid gap-4 border rounded-lg p-4 bg-muted/30">
              <div className="grid grid-cols-[1fr_auto_auto] gap-4 font-medium px-2 text-sm text-muted-foreground">
                <span>Field Name</span>
                <span>Enabled</span>
                <span>Requirement</span>
              </div>
              {leadFormFields.map((field) => {
                const isEnabled = watch(`lead_form.${field.name}.enabled`);
                return (
                  <div
                    key={field.name}
                    className="grid grid-cols-[1fr_auto_auto] gap-4 items-center p-2 rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium">{field.label}</span>
                    <FormCheckbox
                      control={control}
                      name={`lead_form.${field.name}.enabled`}
                    />
                    <FormSwitch
                      control={control}
                      name={`lead_form.${field.name}.required`}
                      label="Required"
                      disabled={!isEnabled}
                    />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Result Delivery Section */}
          <section className="space-y-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold">Result Delivery</h2>
              {/* <p className="text-sm text-muted-foreground">
                Choose how the quiz results will be delivered to the user.
              </p> */}
            </div>
            <div className="grid gap-4 border rounded-lg p-4 bg-muted/30">
              {resultDeliveryFields.map((field) => (
                <div
                  key={field.name}
                  className="flex items-center gap-2 p-2 w-fit rounded-md hover:bg-muted/50 transition-colors"
                >
                  <FormCheckbox
                    control={control}
                    name={`result_delivery.${field.name}`}
                  />
                  <span className="font-medium ">{field.label}</span>
                </div>
              ))}
            </div>
          </section>
        </form>
        <CardAction className="pt-4 w-full flex justify-end items-center gap-2">
          <Button
            type="button"
            variant="outline"
            className="min-w-36"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="min-w-36"
            onClick={handleSubmit(onSubmit as any)}
            loading={isLoading}
          >
            Save Settings
          </Button>
        </CardAction>
      </CardContent>
    </>
  );
};
