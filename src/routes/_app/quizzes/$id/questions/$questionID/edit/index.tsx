import { FormQuizQuestion } from "@/routes/_app/-components";
import { useBreadcrumb } from "@/store/use-breadcrumb.store";
import type { TPtah } from "@/types";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute(
  "/_app/quizzes/$id/questions/$questionID/edit/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([
      { name: "View Quiz", path: `/quizzes/${id}/view/` as TPtah },
      { name: "Quiz Questions", path: `/quizzes/${id}/questions/` as TPtah },
      { name: "Edit Quiz Question" },
    ]);
  }, []);
  return <FormQuizQuestion type="update" id={""} />;
}
