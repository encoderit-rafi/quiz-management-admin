import { FormQuizQuestion } from "../-components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/quizzes/$id/questions/create/")({
  component: RouteComponent,
});
function RouteComponent() {
  const { id } = Route.useParams();

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <FormQuizQuestion form_data={{ quizId: id, type: "create" }} />
    </div>
  );
}
