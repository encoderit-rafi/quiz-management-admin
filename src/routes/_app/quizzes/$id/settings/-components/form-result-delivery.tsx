import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { FormSwitch, FormSelect } from "@/components/form";
import {
  FormResultDeliverySchema,
  type TFormResultDeliverySchema,
} from "../-types";
import { DEFAULT_RESULT_DELIVERY_DATA } from "../-data";
import { CardAction } from "@/components/ui/card";
import { useGetResultDelivery, useUpdateResultDelivery } from "../-apis";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import AppLoading from "@/components/base/app-loading";

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
      console.log(
        "👉 ~ FormResultDelivery ~ settings:",
        settings.result_page_position,
      );
      reset({
        id: settings.id || "",
        quiz_id: quizId,
        enable_email_result: !!settings.enable_email_result,
        enable_pdf_download: !!settings.enable_pdf_download,
        enable_link_share: !!settings.enable_link_share,
        result_page_position: settings.result_page_position || "after",
      });
    }
  }, [settings, reset, quizId]);

  const onSubmit = (data: TFormResultDeliverySchema) => {
    updateSettings(data);
  };

  if (isLoading) return <AppLoading />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-5xl">
      <Table className="border rounded-lg">
        <TableBody>
          <TableRow>
            <TableCell className="">
              <Label
                htmlFor="enable_email_result"
                className="flex items-center gap-2 "
              >
                <div className="">
                  <FormSwitch control={control} name="enable_email_result" />
                </div>
                Email
              </Label>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="">
              <Label
                htmlFor="enable_pdf_download"
                className="flex items-center gap-2 "
              >
                <div className="">
                  <FormSwitch control={control} name="enable_pdf_download" />
                </div>
                PDF Download
              </Label>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="">
              <Label
                htmlFor="enable_link_share"
                className="flex items-center gap-2 "
              >
                <div className="">
                  <FormSwitch control={control} name="enable_link_share" />
                </div>
                Link Share
              </Label>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="">
              <FormSelect
                control={control}
                name="result_page_position"
                label="Result Page Position"
                placeholder="Select position"
                options={[
                  { value: "before", label: "Before Lead Form" },
                  { value: "after", label: "After Lead Form" },
                ]}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <CardAction className="flex justify-end pt-10">
        <Button type="submit" loading={isPending} className="min-w-36">
          Save
        </Button>
      </CardAction>
    </form>
  );
}
