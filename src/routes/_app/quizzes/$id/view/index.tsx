import { createFileRoute, Link } from "@tanstack/react-router";
import { CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Edit,
  FileQuestionMark,
  FileText,
  Settings,
  Users,
} from "lucide-react";
import { CardQuiz } from "../../../-components";
import { useBreadcrumb } from "@/store/use-breadcrumb.store";
import { useEffect } from "react";
import { MoreHorizontalIcon } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DEFAULT_PAGINATION } from "@/consts";
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
        <ButtonGroup>
          <Button variant="outline" asChild>
            <Link to="/quizzes/$id/edit" params={{ id }}>
              <Edit />
              Edit Quiz
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="More Options">
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem asChild>
                <Link to="/quizzes/$id/settings" params={{ id }}>
                  <Settings />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/quizzes/$id/questions" params={{ id }}>
                  <FileQuestionMark />
                  Questions
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/quizzes/$id/result-pages"
                  params={{ id }}
                  search={DEFAULT_PAGINATION}
                >
                  <FileText />
                  Result Pages
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/quizzes/$id/leads" params={{ id }}>
                  <Users />
                  Leads & Results
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/quizzes/$id/statistics" params={{ id }}>
                  <BarChart />
                  Statistics
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </CardHeader>

      <CardQuiz form_data={{ id: id, type: "read" }} />
    </>
  );
}
