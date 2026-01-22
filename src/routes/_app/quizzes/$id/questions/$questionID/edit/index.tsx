// import { FormQuizQuestion } from "../../../-components";
import { createFileRoute } from "@tanstack/react-router";
import { FormQuizQuestion } from "../../-components";

export const Route = createFileRoute(
  "/_app/quizzes/$id/questions/$questionID/edit/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { id, questionID } = Route.useParams();

  return (
    <FormQuizQuestion
      form_data={{ id: questionID, type: "update", quizId: id }}
    />
  );
}
