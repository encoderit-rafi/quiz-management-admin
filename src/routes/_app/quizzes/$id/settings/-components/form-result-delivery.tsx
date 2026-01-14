import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { FormSwitch } from "@/components/form";
import {
  FormResultDeliverySchema,
  type TFormResultDeliverySchema,
} from "../-types";
// import { useGetResultDelivery, useUpdateResultDelivery } from "../-apis";
import { DEFAULT_RESULT_DELIVERY_DATA } from "../-data";
import { CardAction } from "@/components/ui/card";
import { useGetResultDelivery, useUpdateResultDelivery } from "../-apis";

type TProps = {
  quizId: string | number;
};

export default function FormResultDelivery({ quizId }: TProps) {
  const { data: settings, isLoading } = useQuery(useGetResultDelivery(quizId));
  const { mutate: updateSettings, isPending } = useUpdateResultDelivery(quizId);

  const form = useForm<TFormResultDeliverySchema>({
    resolver: zodResolver(FormResultDeliverySchema),
    defaultValues: DEFAULT_RESULT_DELIVERY_DATA(quizId),
  });

  const { control, handleSubmit, reset } = form;

  useEffect(() => {
    if (settings) {
      reset({
        quiz_id: quizId,
        ...settings,
      });
    }
  }, [settings, reset, quizId]);

  const onSubmit = (data: TFormResultDeliverySchema) => {
    updateSettings(data);
  };

  if (isLoading) return <div>Loading result delivery settings...</div>;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSwitch
            control={control}
            name="enable_email_result"
            label="Enable Email Results"
            description="Send quiz results to users via email."
          />
          <FormSwitch
            control={control}
            name="enable_pdf_download"
            label="Enable PDF Download"
            description="Allow users to download their results as a PDF."
          />
          <FormSwitch
            control={control}
            name="enable_link_share"
            label="Enable Link Share"
            description="Allow users to share their result link."
          />
        </div>

        <CardAction className="flex justify-end pt-4">
          <Button type="submit" loading={isPending} className="min-w-36">
            Save Result Settings
          </Button>
        </CardAction>
      </form>
    </div>
  );
}
