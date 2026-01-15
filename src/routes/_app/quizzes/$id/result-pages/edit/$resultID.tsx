import { createFileRoute } from "@tanstack/react-router";
import { FormResultPage } from "../-components";

export const Route = createFileRoute(
  "/_app/quizzes/$id/result-pages/edit/$resultID"
)({
  component: EditResultPage,
});

function EditResultPage() {
  const { id, resultID } = Route.useParams();

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <FormResultPage
        form_data={{ id: resultID, type: "update", quizId: id }}
      />
    </div>
  );
}
