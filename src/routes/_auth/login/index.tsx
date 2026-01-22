import { createFileRoute, Link } from "@tanstack/react-router";
import { AudioWaveform } from "lucide-react";
import { FormLogin } from "./-components";
import AppTitle from "@/components/base/app-title";
import AppSubTitle from "@/components/base/app-subtitle";
import { DEFAULT_PAGINATION } from "@/consts";
export const Route = createFileRoute("/_auth/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-md flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <Link to="/" search={{ ...DEFAULT_PAGINATION }}>
          <AudioWaveform className="size-12" />
        </Link>
        <AppTitle>
          Welcome to <span className="font-bold">QZ</span>.
        </AppTitle>
        <AppSubTitle>
          Log in to oversee quizzes, analytics, and system settings.
        </AppSubTitle>
      </div>
      <FormLogin />
    </div>
  );
}
