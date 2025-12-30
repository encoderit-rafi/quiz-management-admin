import { createFileRoute, useRouter } from "@tanstack/react-router";
import { FormQuiz } from "../../-components";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_app/_quizzes/quizzes/create/")({
  component: CreateQuizPage,
});

function CreateQuizPage() {
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
        <Button variant="outline" size={"icon"} onClick={handleCancel}>
          <ArrowLeft />
        </Button>
        <div className="flex flex-col">
          <CardTitle>Create Quiz</CardTitle>
          <CardDescription>
            Create a new quiz to start adding questions.
          </CardDescription>
        </div>
      </CardHeader>

      <FormQuiz
        form_data={{ id: "", type: "create" }}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
}
