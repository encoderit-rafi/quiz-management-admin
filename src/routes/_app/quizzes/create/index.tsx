import {
  createFileRoute,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { FormQuiz } from "../../-components";
import { useSetRoute } from "@/hooks/use-set-route";
// import { CardHeader } from "@/components/ui/card";
// import AppCardHeaderWithBackButton from "@/components/base/app-card-header-with-back-button";

export const Route = createFileRoute("/_app/quizzes/create/")({
  component: CreateQuizPage,
});

function CreateQuizPage() {
  const {
    location: { pathname },
  } = useRouterState();
  const router = useRouter();

  const handleSuccess = () => {
    router.history.back();
  };

  const handleCancel = () => {
    router.history.back();
  };
  useSetRoute({ name: "Create Quiz", path: pathname });
  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      {/* <CardHeader className="flex items-start gap-2">
        <AppCardHeaderWithBackButton
          title="Create Quiz"
          description="Create a new quiz to start adding questions."
        />
      </CardHeader> */}

      <FormQuiz
        form_data={{ id: "", type: "create" }}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
}
