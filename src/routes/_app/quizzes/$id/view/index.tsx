import { createFileRoute, Link } from "@tanstack/react-router";
import { CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { CardQuiz } from "../../../-components";
import { useBreadcrumb } from "@/store/use-breadcrumb.store";
import { useEffect } from "react";
// import { useSetRoute } from "@/hooks/use-set-route";

export const Route = createFileRoute("/_app/quizzes/$id/view/")({
  component: ViewQuizPage,
});

function ViewQuizPage() {
  const { id } = Route.useParams();

  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([{ name: "View Quiz" }]);
  }, []);

  return (
    <>
      <CardHeader className="flex items-center gap-2 justify-end">
        <Button asChild>
          <Link to="/quizzes/$id/edit" params={{ id }}>
            <Edit />
            Edit Quiz
          </Link>
        </Button>
      </CardHeader>

      <CardQuiz form_data={{ id: id, type: "read" }} />
    </>
  );
}
