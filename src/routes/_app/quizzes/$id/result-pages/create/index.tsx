import { createFileRoute } from "@tanstack/react-router";
import { FormResultPage } from "../-components";
import { useSetRoute } from "@/hooks/use-set-route";

export const Route = createFileRoute("/_app/quizzes/$id/result-pages/create/")({
  component: CreateResultPage,
});

function CreateResultPage() {
  useSetRoute({ name: "Create Result Page", path: Route.fullPath });
  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <FormResultPage type="create" onSuccess={() => {}} onCancel={() => {}} />
    </div>
  );
}
