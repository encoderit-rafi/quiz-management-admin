import { useNavigate, createFileRoute } from "@tanstack/react-router";
import { FormResultPage } from "../-components";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AppCardHeaderWithBackButton from "@/components/base/app-card-header-with-back-button";

export const Route = createFileRoute("/_app/result-pages/create/")({
  component: CreateResultPage,
});

function CreateResultPage() {
  const navigate = useNavigate();

  // const handleBack = () => {
  //   navigate({ to: "/result-pages" });
  // };

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <CardHeader className="flex items-start gap-2">
        <AppCardHeaderWithBackButton
          title="Create Result Page"
          description="Define the content shown to users based on their quiz score."
          // onBack={() => navigate({ to: "/result-pages" })}
        />
      </CardHeader>

      <FormResultPage type="create" onSuccess={() => {}} onCancel={() => {}} />
    </div>
  );
}
