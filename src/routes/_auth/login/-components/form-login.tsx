import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { DataFormLogin, SchemaFormLogin, type TFormLogin } from "../-types";
import { useLogin } from "../-apis";
import { FieldGroup } from "@/components/ui/field";
import { FormInput } from "@/components/form";
import { FormPasswordInput } from "@/components/form/form-password-input";
import { Link } from "@tanstack/react-router";
export const FormLogin = () => {
  //^ APIS
  const { mutate: login, isPending } = useLogin();

  //^ FORM
  const form = useForm<TFormLogin>({
    resolver: zodResolver(SchemaFormLogin),
    defaultValues: DataFormLogin,
  });
  const { control, handleSubmit } = form;

  //^ SUBMIT
  function onSubmit(values: TFormLogin) {
    login(values);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FormInput
          control={control}
          type="email"
          name="email"
          label="Email"
          placeholder="m@example.com"
        />
        <div className="flex flex-col gap-2 items-end">
          <FormPasswordInput
            control={control}
            name="password"
            label="Password"
            placeholder="* * * * *"
          />
          <Link
            to="/forgot-password"
            className="font-thin duration-150 hover:underline text-sm"
          >
            Forgot password
          </Link>
        </div>
        <Button type="submit" className="w-full" loading={isPending}>
          Login
        </Button>
      </FieldGroup>
    </form>
  );
};
