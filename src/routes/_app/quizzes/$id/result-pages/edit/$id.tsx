import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { FormResultPage } from "../-components";
import { useGetResultPage } from "../-apis";
import { useBreadcrumb } from "@/store/use-breadcrumb.store";
import { useEffect } from "react";
import type { TPtah } from "@/types";

export const Route = createFileRoute("/_app/quizzes/$id/result-pages/edit/$id")(
  {
    component: EditResultPage,
  }
);

function EditResultPage() {
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
        name: "Quiz Result Details",
        path: `/quizzes/${id}/result-pages/view/${id}` as TPtah,
      },
      {
        name: "Edit Result Page",
      },
    ]);
  }, []);
  const { data: resultPage } = useQuery(useGetResultPage(id));

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <FormResultPage
        type="update"
        initialData={resultPage}
        onSuccess={() => {}}
        onCancel={() => {}}
      />
    </div>
  );
}
