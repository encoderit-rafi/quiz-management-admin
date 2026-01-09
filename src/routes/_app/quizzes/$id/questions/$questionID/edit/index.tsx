import AppCardHeaderWithBackButton from "@/components/base/app-card-header-with-back-button";
import { CardHeader } from "@/components/ui/card";
import { FormQuizQuestion } from "@/routes/_app/_quizzes/-components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/quizzes/$id/questions/$questionID/edit/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <CardHeader className="flex items-center gap-2">
        <AppCardHeaderWithBackButton
          title="Edit Quiz Question"
          description="Update quiz question information and details"
        />
      </CardHeader>
      <FormQuizQuestion type="update" id={""} />
    </>
  );
}
