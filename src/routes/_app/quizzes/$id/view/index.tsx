import { createFileRoute } from "@tanstack/react-router";
import { CardQuiz } from "../../../-components";
export const Route = createFileRoute("/_app/quizzes/$id/view/")({
  component: ViewQuizPage,
});

function ViewQuizPage() {
  const { id } = Route.useParams();

  return <CardQuiz form_data={{ id: id, type: "read" }} />;
}
