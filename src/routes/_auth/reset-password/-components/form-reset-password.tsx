import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { FormSchema, type TFormSchema } from "../-types";
import { useResetPassword } from "../-apis/use-reset-password.api";
import { useEffect } from "react";
import { FieldGroup } from "@/components/ui/field";
import { FormPasswordInput } from "@/components/form/form-password-input";

type TProps = {
  email: string;
  token: string;
};

export default function FormResetPassword({ email, token }: TProps) {
  const { mutate: resetPassword, isPending } = useResetPassword();

  const form = useForm<TFormSchema>({ resolver: zodResolver(FormSchema) });
  const { control, handleSubmit, setValue } = form;

  useEffect(() => {
    if (!!email && !!token) {
      setValue("email", email);
      setValue("token", token);
    }
  }, [email, token, setValue]);

  function onSubmit(values: TFormSchema) {
    console.log("Form submitted:", values);
    resetPassword(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FormPasswordInput
          control={control}
          name="password"
          label="NewPassword"
          placeholder="* * * * *"
        />
        <FormPasswordInput
          control={control}
          name="password"
          label="Confirm Password"
          placeholder="* * * * *"
        />

        <Button type="submit" loading={isPending} className="w-full">
          Reset Password
        </Button>
      </FieldGroup>
    </form>
  );
}
