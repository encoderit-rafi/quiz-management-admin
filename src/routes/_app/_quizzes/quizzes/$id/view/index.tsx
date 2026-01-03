import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
// import { CardQuiz } from "../../-components";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import { CardQuiz } from "../../../-components";
import AppCardHeaderWithBackButton from "@/components/base/app-card-header-with-back-button";

export const Route = createFileRoute("/_app/_quizzes/quizzes/$id/view/")({
  component: ViewQuizPage,
});

function ViewQuizPage() {
  const { id } = Route.useParams();
  // const router = useRouter();

  // const handleBack = () => {
  //   router.history.back();
  // };

  return (
    <>
      <CardHeader className="flex items-center gap-2">
        <AppCardHeaderWithBackButton
          title="Quiz Details"
          description="View quiz information and details"
        />
        <Button asChild>
          <Link to="/quizzes/$id/edit" params={{ id }}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Quiz
          </Link>
        </Button>
      </CardHeader>

      <CardQuiz form_data={{ id: id, type: "read" }} />
    </>
  );
}
