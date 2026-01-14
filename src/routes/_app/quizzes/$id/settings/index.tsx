import { createFileRoute } from "@tanstack/react-router";
import { CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { useBreadcrumb } from "@/store/use-breadcrumb.store";
import type { TPtah } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormLead, FormResultDelivery } from "./-components";

export const Route = createFileRoute("/_app/quizzes/$id/settings/")({
  component: QuizSettingsPage,
});

function QuizSettingsPage() {
  const { id } = Route.useParams();
  const { setBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumb([
      { name: "View Quiz", path: `/quizzes/${id}/view/` as TPtah },
      { name: "Quiz Settings" },
    ]);
  }, [id, setBreadcrumb]);

  return (
    <CardContent className="flex-1 flex flex-col overflow-hidden">
      <Tabs defaultValue="lead-form" className="flex-1 flex flex-col">
        <TabsList className="w-fit">
          <TabsTrigger value="lead-form">Lead Form</TabsTrigger>
          <TabsTrigger value="result-delivery">Result Delivery</TabsTrigger>
        </TabsList>
        <div className="flex-1 overflow-y-auto mt-6">
          <TabsContent value="lead-form">
            <FormLead quizId={id} />
          </TabsContent>
          <TabsContent value="result-delivery">
            <FormResultDelivery quizId={id} />
          </TabsContent>
        </div>
      </Tabs>
    </CardContent>
  );
}
