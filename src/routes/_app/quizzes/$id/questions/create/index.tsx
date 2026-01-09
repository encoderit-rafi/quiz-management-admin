import { useSetRoute } from "@/hooks/use-set-route";
import { FormQuizQuestion } from "@/routes/_app/-components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/quizzes/$id/questions/create/")({
  component: RouteComponent,
});
function RouteComponent() {
  useSetRoute({ name: "Create Quiz Question", path: Route.fullPath });
  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <FormQuizQuestion type="create" id="" />
      {/* <FormQuiz
        form_data={{ id: "", type: "create" }}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      /> */}
    </div>
  );
}
