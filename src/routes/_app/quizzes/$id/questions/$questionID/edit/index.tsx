import { useSetRoute } from "@/hooks/use-set-route";
import { FormQuizQuestion } from "@/routes/_app/-components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/quizzes/$id/questions/$questionID/edit/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  useSetRoute({ name: "Edit Quiz Question", path: Route.fullPath });

  return <FormQuizQuestion type="update" id={""} />;
}
