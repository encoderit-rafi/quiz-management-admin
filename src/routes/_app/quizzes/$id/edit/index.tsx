import { createFileRoute } from "@tanstack/react-router";
import { FormQuiz } from "../../../-components";

export const Route = createFileRoute("/_app/quizzes/$id/edit/")({
  component: EditQuizPage,
});

function EditQuizPage() {
  const { id } = Route.useParams();

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <FormQuiz form_data={{ id: id, type: "update" }} />
    </div>
  );
}
