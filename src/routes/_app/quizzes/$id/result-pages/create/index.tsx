import { createFileRoute } from "@tanstack/react-router";
import { FormResultPage } from "../-components";
import { useBreadcrumb } from "@/store/use-breadcrumb.store";
import { useEffect } from "react";
import type { TPtah } from "@/types";

export const Route = createFileRoute("/_app/quizzes/$id/result-pages/create/")({
  component: CreateResultPage,
});

function CreateResultPage() {
  const { id } = Route.useParams();
  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([
      { name: "View Quiz", path: `/quizzes/${id}/view/` as TPtah },
      {
        name: "Quiz Result Pages",
        path: `/quizzes/${id}/result-pages/` as TPtah,
      },
      {
        name: "Create Result Page",
      },
    ]);
  }, []);
  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <FormResultPage type="create" onSuccess={() => {}} onCancel={() => {}} />
    </div>
  );
}
