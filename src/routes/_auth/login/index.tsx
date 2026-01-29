import { createFileRoute, Link } from "@tanstack/react-router";
import { AudioWaveform } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FormLogin } from "./-components";
import AppTitle from "@/components/base/app-title";
import AppSubTitle from "@/components/base/app-subtitle";
import { DEFAULT_PAGINATION } from "@/consts";
export const Route = createFileRoute("/_auth/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  return (
    <div className="max-w-md flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <Link to="/" search={{ ...DEFAULT_PAGINATION }}>
          <AudioWaveform className="size-12" />
        </Link>
        <AppTitle>
          {t("auth.welcome")} <span className="font-bold">QZ</span>.
        </AppTitle>
        <AppSubTitle>{t("auth.subtitle")}</AppSubTitle>
      </div>
      <FormLogin />
    </div>
  );
}
