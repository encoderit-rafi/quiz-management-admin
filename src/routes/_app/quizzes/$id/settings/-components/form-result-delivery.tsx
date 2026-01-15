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
import { DEFAULT_RESULT_DELIVERY_DATA } from "../-data";
import { CardAction } from "@/components/ui/card";
import { useGetResultDelivery, useUpdateResultDelivery } from "../-apis";
import { Label } from "@/components/ui/label";

type TProps = {
  quizId: string | number;
};

export default function FormResultDelivery({ quizId }: TProps) {
  const { data: settings, isLoading } = useQuery(useGetResultDelivery(quizId));
  const { mutate: updateSettings, isPending } = useUpdateResultDelivery(quizId);

  const form = useForm<TFormResultDeliverySchema>({
    resolver: zodResolver(FormResultDeliverySchema),
    defaultValues: DEFAULT_RESULT_DELIVERY_DATA,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;
  console.log("👉 ~ FormResultDelivery ~ errors:", errors);

  useEffect(() => {
    if (settings) {
      reset({
        id: settings.id || "",
        quiz_id: quizId,
        enable_email_result: !!settings.enable_email_result,
        enable_pdf_download: !!settings.enable_pdf_download,
        enable_link_share: !!settings.enable_link_share,
      });
    }
  }, [settings, reset, quizId]);

  const onSubmit = (data: TFormResultDeliverySchema) => {
    updateSettings(data);
  };

  if (isLoading) return <div>Loading result delivery settings...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <Label htmlFor="enable_email_result">
          <FormSwitch control={control} name="enable_email_result" />
          Email
        </Label>
        <Label htmlFor="enable_pdf_download">
          <FormSwitch control={control} name="enable_pdf_download" />
          PDF Download
        </Label>
        <Label htmlFor="enable_link_share">
          <FormSwitch control={control} name="enable_link_share" />
          Link Share
        </Label>
      </div>

      <CardAction className="flex justify-end pt-4">
        <Button type="submit" loading={isPending} className="min-w-36">
          Save
        </Button>
      </CardAction>
    </form>
  );
}
