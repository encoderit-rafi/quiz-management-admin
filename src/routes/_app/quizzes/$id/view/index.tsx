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
import { MoreHorizontalIcon } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DEFAULT_PAGINATION } from "@/consts";
import { useBreadcrumb } from "@/store/use-breadcrumb.store";
import type { TPath } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useGetQuiz } from "../../../-apis";
import { useEffect } from "react";
export const Route = createFileRoute("/_app/quizzes/$id/view/")({
  component: ViewQuizPage,
});

function ViewQuizPage() {
  const { id } = Route.useParams();
  const { setBreadcrumb } = useBreadcrumb();
  const { data: quiz } = useQuery(useGetQuiz(id));

  const handelBreadcrumb = ({ module = "" }: { module?: string }) => {
    if (!quiz) return;
    setBreadcrumb(
      [
        { name: quiz.name, path: `/quizzes/${quiz.id}/view` as TPath },
        { name: module },
      ].filter((item) => item.name)
    );
  };
  useEffect(() => {
    if (!quiz) return;
    setBreadcrumb([
      { name: quiz.name, path: `/quizzes/${quiz.id}/view` as TPath },
    ]);
  }, [quiz]);

  return (
    <>
      <CardHeader className="flex items-center gap-2 justify-end">
        <ButtonGroup>
          <Button variant="outline" asChild>
            <Link
              to="/quizzes/$id/edit"
              params={{ id }}
              onClick={() => handelBreadcrumb({ module: "Edit" })}
            >
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
              <DropdownMenuItem
                asChild
                onClick={() => handelBreadcrumb({ module: "Settings" })}
              >
                <Link to="/quizzes/$id/settings" params={{ id }}>
                  <Settings />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                onClick={() => handelBreadcrumb({ module: "Questions" })}
              >
                <Link
                  to="/quizzes/$id/questions"
                  params={{ id }}
                  search={DEFAULT_PAGINATION}
                >
                  <FileQuestionMark />
                  Questions
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                onClick={() => handelBreadcrumb({ module: "Result Pages" })}
              >
                <Link
                  to="/quizzes/$id/result-pages"
                  params={{ id }}
                  search={DEFAULT_PAGINATION}
                >
                  <FileText />
                  Result Pages
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                onClick={() => handelBreadcrumb({ module: "Leads & Results" })}
              >
                <Link
                  to="/quizzes/$id/leads"
                  params={{ id }}
                  search={DEFAULT_PAGINATION}
                >
                  <Users />
                  Leads & Results
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                onClick={() => handelBreadcrumb({ module: "Statistics" })}
              >
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
