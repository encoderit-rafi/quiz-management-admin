import { createFileRoute } from "@tanstack/react-router";
import { FormQuiz } from "../../-components";

export const Route = createFileRoute("/_app/quizzes/create/")({
  component: CreateQuizPage,
});

function CreateQuizPage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden p-6">
      <FormQuiz form_data={{ id: "", type: "create" }} />
    </div>
  );
}
