import { useNavigate, createFileRoute } from "@tanstack/react-router";
import { FormResultPage } from "../-components";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_app/result-pages/create/")({
  component: CreateResultPage,
});

function CreateResultPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate({ to: "/result-pages" });
  };

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <CardHeader className="flex items-start gap-2">
        <Button variant="outline" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex flex-col">
          <CardTitle>Create Result Page</CardTitle>
          <CardDescription>
            Define the content shown to users based on their quiz score.
          </CardDescription>
        </div>
      </CardHeader>

      <FormResultPage
        type="create"
        onSuccess={handleBack}
        onCancel={handleBack}
      />
    </div>
  );
}
