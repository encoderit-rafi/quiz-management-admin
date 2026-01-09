import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { FormResultPage } from "../-components";
import { useGetResultPage } from "../-apis";
import { CardHeader } from "@/components/ui/card";
import AppCardHeaderWithBackButton from "@/components/base/app-card-header-with-back-button";
import { useSetRoute } from "@/hooks/use-set-route";

export const Route = createFileRoute("/_app/quizzes/$id/result-pages/edit/$id")(
  {
    component: EditResultPage,
  }
);

function EditResultPage() {
  const { id } = Route.useParams();
  useSetRoute({ name: "Edit Result Page", path: Route.fullPath });
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
