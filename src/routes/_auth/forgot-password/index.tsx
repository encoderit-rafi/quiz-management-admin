import { createFileRoute, Link } from "@tanstack/react-router";
import FormForgotPassword from "./-components/form-forgot-password";
import { AudioWaveform } from "lucide-react";
import AppTitle from "@/components/base/app-title";
import AppSubTitle from "@/components/base/app-subtitle";
import { DEFAULT_PAGINATION } from "@/consts";

export const Route = createFileRoute("/_auth/forgot-password/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-md flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <Link to="/" search={{ ...DEFAULT_PAGINATION }}>
          <AudioWaveform className="size-12" />
        </Link>
        <AppTitle>Forgot Your Password?</AppTitle>
        <AppSubTitle>
          Enter your email to receive a password reset link.
        </AppSubTitle>
      </div>

      <FormForgotPassword />
    </div>
  );
}
