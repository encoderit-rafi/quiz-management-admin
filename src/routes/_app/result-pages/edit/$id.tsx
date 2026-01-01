import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { FormResultPage } from "../-components";
import { useGetResultPage } from "../-apis";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_app/result-pages/edit/$id")({
  component: EditResultPage,
});

function EditResultPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const { data: resultPage, isLoading } = useQuery(useGetResultPage(id));

  const handleBack = () => {
    navigate({ to: "/result-pages" });
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <CardHeader className="flex items-start gap-2">
        <Button variant="outline" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex flex-col">
          <CardTitle>Edit Result Page</CardTitle>
          <CardDescription>
            Modify the content and score range for this result page.
          </CardDescription>
        </div>
      </CardHeader>

      <FormResultPage
        type="update"
        initialData={resultPage}
        onSuccess={handleBack}
        onCancel={handleBack}
      />
    </div>
  );
}
