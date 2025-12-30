import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { CardQuiz } from "../../-components";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";

export const Route = createFileRoute("/_app/_quizzes/quizzes/view/$id")({
  component: ViewQuizPage,
});

function ViewQuizPage() {
  const { id } = Route.useParams();
  const router = useRouter();

  const handleBack = () => {
    router.history.back();
  };

  return (
    <>
      <CardHeader className="flex items-center gap-2">
        <div className="flex-1 flex items-start gap-2 ">
          <Button variant="outline" size={"icon"} onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex flex-col flex-1">
            <CardTitle>Quiz Details</CardTitle>
            <CardDescription>View quiz information and details</CardDescription>
          </div>
        </div>
        <Button asChild variant="outline">
          <Link to="/quizzes/edit/$id" params={{ id }}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Quiz
          </Link>
        </Button>
      </CardHeader>

      <CardQuiz form_data={{ id: id, type: "read" }} />
    </>
  );
}
