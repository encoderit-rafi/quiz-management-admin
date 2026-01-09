import { createFileRoute, useRouter } from "@tanstack/react-router";
import { CardHeader } from "@/components/ui/card";
import { FormQuiz } from "../../../-components";
import AppCardHeaderWithBackButton from "@/components/base/app-card-header-with-back-button";

export const Route = createFileRoute("/_app/quizzes/$id/edit/")({
  component: EditQuizPage,
});

function EditQuizPage() {
  const { id } = Route.useParams();
  const router = useRouter();

  const handleSuccess = () => {
    router.history.back();
  };

  const handleCancel = () => {
    router.history.back();
  };

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <CardHeader className="flex items-start gap-2">
        <AppCardHeaderWithBackButton
          title="Edit Quiz"
          description="Update quiz information"
        />
      </CardHeader>

      <FormQuiz
        form_data={{ id: id, type: "update" }}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
}
