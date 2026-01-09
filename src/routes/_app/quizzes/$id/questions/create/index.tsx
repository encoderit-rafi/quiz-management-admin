import AppCardHeaderWithBackButton from "@/components/base/app-card-header-with-back-button";
import { CardHeader } from "@/components/ui/card";
import { FormQuizQuestion } from "@/routes/_app/_quizzes/-components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/quizzes/$id/questions/create/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <CardHeader className="flex items-start gap-2">
        <AppCardHeaderWithBackButton
          title="Create Quiz Question"
          description="Create a new quiz question to start adding options."
        />
      </CardHeader>

      <FormQuizQuestion type="create" id="" />
      {/* <FormQuiz
        form_data={{ id: "", type: "create" }}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      /> */}
    </div>
  );
}
