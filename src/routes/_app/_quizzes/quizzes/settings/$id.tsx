import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { FormQuizSettings } from "../../-components";
import { useGetQuizSettings, useUpdateQuizSettings } from "../../-apis";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const Route = createFileRoute("/_app/_quizzes/quizzes/settings/$id")({
  component: QuizSettingsPage,
});

function QuizSettingsPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const { data: settings, isLoading: isFetching } = useQuery(
    useGetQuizSettings(id)
  );

  const { mutate: updateSettings, isPending: isUpdating } =
    useUpdateQuizSettings(id);

  const handleSubmit = (data: any) => {
    updateSettings(data, {
      onSuccess: () => {
        navigate({ to: "/", search: { page: 1, per_page: 15 } });
      },
    });
  };

  const handleCancel = () => {
    navigate({ to: "/", search: { page: 1, per_page: 15 } });
  };

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <CardHeader className="flex items-start gap-2">
        <Button variant="outline" size="icon" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex flex-col">
          <CardTitle>Quiz Settings</CardTitle>
          <CardDescription>
            Configure lead generation and result delivery for this quiz.
          </CardDescription>
        </div>
      </CardHeader>

      <div className="flex-1 flex flex-col overflow-hidden">
        {!isFetching && (
          <FormQuizSettings
            initialData={settings}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isUpdating}
          />
        )}
        {isFetching && (
          <div className="flex items-center justify-center p-12">
            <p className="text-muted-foreground">Loading settings...</p>
          </div>
        )}
      </div>
    </div>
  );
}
