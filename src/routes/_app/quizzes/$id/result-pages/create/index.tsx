import { createFileRoute } from "@tanstack/react-router";
import { FormResultPage } from "../-components";

export const Route = createFileRoute("/_app/quizzes/$id/result-pages/create/")({
  component: CreateResultPage,
});

function CreateResultPage() {
  const { id } = Route.useParams();

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <FormResultPage form_data={{ quizId: id, type: "create" }} />
    </div>
  );
}
