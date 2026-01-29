import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormLead, FormResultDelivery } from "./-components";
import { z } from "zod";
const SearchParams = z.object({
  tab: z.enum(["lead-form", "result-delivery"]).catch("lead-form"),
});
export const Route = createFileRoute("/_app/quizzes/$id/settings/")({
  component: QuizSettingsPage,
  validateSearch: SearchParams,
});

function QuizSettingsPage() {
  const { t } = useTranslation();
  const navigate = Route.useNavigate();
  const { id } = Route.useParams();
  const { tab } = Route.useSearch();

  return (
    <CardContent className="flex-1 flex flex-col overflow-hidden">
      <Tabs
        defaultValue={tab}
        className="flex-1 flex flex-col"
        onValueChange={(value) => {
          navigate({
            search: { tab: value as "lead-form" | "result-delivery" },
          });
        }}
      >
        <TabsList className="w-fit">
          <TabsTrigger value="lead-form">
            {t("quizzes.settings.leadForm")}
          </TabsTrigger>
          <TabsTrigger value="result-delivery">
            {t("quizzes.settings.resultDelivery")}
          </TabsTrigger>
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
