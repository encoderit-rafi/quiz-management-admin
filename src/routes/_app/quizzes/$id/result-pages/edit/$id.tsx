import { createFileRoute } from "@tanstack/react-router";
// import { FormResultPage } from "../-components";
import { useBreadcrumb } from "@/store/use-breadcrumb.store";
import { useEffect } from "react";
import type { TPtah } from "@/types";
import { FormResultPage } from "../-components";

export const Route = createFileRoute("/_app/quizzes/$id/result-pages/edit/$id")(
  {
    component: EditResultPage,
  }
);

function EditResultPage() {
  const { id, id: resultPageId } = Route.useParams();
  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([
      { name: "View Quiz", path: `/quizzes/${id}/view/` as TPtah },
      {
        name: "Quiz Result Pages",
        path: `/quizzes/${id}/result-pages/` as TPtah,
      },
      {
        name: "Quiz Result Details",
        path: `/quizzes/${id}/result-pages/view/${resultPageId}` as TPtah,
      },
      {
        name: "Edit Result Page",
      },
    ]);
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <FormResultPage
        form_data={{ id: resultPageId, type: "update", quizId: id }}
      />
    </div>
  );
}
