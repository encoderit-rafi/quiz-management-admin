import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormSchema, type TFormSchema } from "../-types/form.type";
import { useForgotPassword } from "../-apis";
import { FieldGroup } from "@/components/ui/field";
import { FormInput } from "@/components/form";

export default function FormForgotPassword() {
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const form = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
  });

  const { control, handleSubmit } = form;

  function onSubmit(values: TFormSchema) {
    forgotPassword({
      email: values.email,
      redirect_url: `${window.location.origin}`,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FormInput
          control={control}
          type="email"
          name="email"
          placeholder="m@example.com"
        />

        <Button type="submit" className="w-full" loading={isPending}>
          Submit
        </Button>
      </FieldGroup>
    </form>
  );
}
