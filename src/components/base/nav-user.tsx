import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  BarChart,
  Edit,
  FileQuestionMark,
  FileText,
  LogOut,
  Menu,
  // MoreHorizontal,
  Settings,
  Users,
} from "lucide-react";
import { useActiveQuiz } from "@/store";
import { Button } from "../ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { DEFAULT_PAGINATION } from "@/consts";
import { cn } from "@/utils";
export default function NavUser() {
  const {
    activeQuiz: { quiz },
  } = useActiveQuiz();
  const id = String(quiz.id);
  const { pathname } = useRouterState({
    select: (state) => state.location,
  });
  const path = pathname.split("/")[3];
  console.log("👉 ~ NavUser ~ path:", path);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {id ? (
          <Button variant={"outline"} size="icon">
            <Menu />
          </Button>
        ) : (
          <Button variant={"outline"} size="icon">
            <LogOut className="text-destructive" />
          </Button>
        )}
      </DropdownMenuTrigger>
      {id && (
        <DropdownMenuContent align="end" className="space-y-1 p-1">
          <DropdownMenuItem
            asChild
            className={cn({
              "bg-muted": path === "edit",
            })}
          >
            <Link to="/quizzes/$id/edit" params={{ id }}>
              <Edit />
              Edit Quiz
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className={cn({
              "bg-muted": path === "settings",
            })}
          >
            <Link to="/quizzes/$id/settings" params={{ id }}>
              <Settings />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className={cn({
              "bg-muted": path === "questions",
            })}
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
            className={cn({
              "bg-muted": path === "result-pages",
            })}
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
            className={cn({
              "bg-muted": path === "leads",
            })}
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
            className={cn({
              "bg-muted": path === "statistics",
            })}
          >
            <Link to="/quizzes/$id/statistics" params={{ id }}>
              <BarChart />
              Statistics
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
