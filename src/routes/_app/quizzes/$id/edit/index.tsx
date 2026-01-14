import { createFileRoute } from "@tanstack/react-router";
import { FormQuiz } from "../../../-components";
import { useBreadcrumb } from "@/store/use-breadcrumb.store";
import { useEffect } from "react";
import type { TPtah } from "@/types";

export const Route = createFileRoute("/_app/quizzes/$id/edit/")({
  component: EditQuizPage,
});

function EditQuizPage() {
  const { id } = Route.useParams();

  const { setBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumb([
      { name: "View Quiz", path: `/quizzes/${id}/view/` as TPtah },
      { name: "Edit Quiz" },
    ]);
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <FormQuiz form_data={{ id: id, type: "update" }} />
    </div>
  );
}
