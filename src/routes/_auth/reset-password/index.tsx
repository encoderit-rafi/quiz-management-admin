import { createFileRoute, Link } from "@tanstack/react-router";
import FormResetPassword from "./-components/form-reset-password";
import { AudioWaveform } from "lucide-react";
import AppTitle from "@/components/base/app-title";
import AppSubTitle from "@/components/base/app-subtitle";
import { z } from "zod";
const SearchValidator = z.object({
  token: z.string().optional(),
  email: z.string().optional(),
});
export const Route = createFileRoute("/_auth/reset-password/")({
  component: RouteComponent,
  validateSearch: SearchValidator,
});

function RouteComponent() {
  const { email = "", token = "" } = Route.useSearch();

  return (
    <div className="max-w-md flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <Link to="/">
          <AudioWaveform className="size-12" />
        </Link>
        <AppTitle>Reset Password</AppTitle>
        <AppSubTitle>
          Create a new password for your account to regain access.
        </AppSubTitle>
      </div>
      <FormResetPassword email={email} token={token} />
    </div>
  );
}
