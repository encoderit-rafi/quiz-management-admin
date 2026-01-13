import {
  createFileRoute,
  useRouter,
  // useRouterState,
} from "@tanstack/react-router";
import { FormQuiz } from "../../-components";
import { useBreadcrumb } from "@/store/use-breadcrumb.store";
import { useEffect } from "react";
// import useBreadcrumbPath from "@/hooks/use-breadcrumb-path";
// import { useSetRoute } from "@/hooks/use-set-route";
// import { useBreadcrumb } from "@/store/use-breadcrumb.store";
// import { useEffect } from "react";

export const Route = createFileRoute("/_app/quizzes/create/")({
  component: CreateQuizPage,
});

function CreateQuizPage() {
  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([{ name: "Create Quiz" }]);
  }, []);
  // const {
  //   location: { pathname },
  // } = useRouterState();
  const router = useRouter();

  const handleSuccess = () => {
    router.history.back();
  };

  const handleCancel = () => {
    router.history.back();
  };
  // useSetRoute({ name: "Create Quiz", path: pathname });
  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <FormQuiz
        form_data={{ id: "", type: "create" }}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
}
