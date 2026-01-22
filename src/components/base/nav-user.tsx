import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BarChart,
  Edit,
  FileQuestionMark,
  FileText,
  LogOut,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import { useActiveQuiz } from "@/store";
import { useToken } from "@/store/use-token.store";
import { Button } from "../ui/button";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { DEFAULT_PAGINATION } from "@/consts";
import { cn } from "@/utils";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function NavUser() {
  const theme = localStorage.getItem("theme");
  const {
    activeQuiz: { quiz },
  } = useActiveQuiz();
  const id = String(quiz.id);
  const { pathname } = useRouterState({
    select: (state) => state.location,
  });
  const path = pathname.split("/")[3];

  const { setToken } = useToken();
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const confirmLogout = () => {
    setToken(null);
    localStorage.clear();
    localStorage.setItem("theme", theme || "dark");
    navigate({ to: "/login" });
    setShowLogoutDialog(false);
  };

  if (!id) {
    return (
      <>
        <Button
          variant={"outline"}
          size="icon"
          onClick={() => setShowLogoutDialog(true)}
        >
          <LogOut className="text-destructive" />
        </Button>
        <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                You will be logged out of your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmLogout}
                className="bg-destructive hover:bg-destructive/80 text-white"
              >
                <LogOut />
                Log out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size="icon">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
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
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setShowLogoutDialog(true)}
          >
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be logged out of your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmLogout}
              className="bg-destructive hover:bg-destructive/80 text-white"
            >
              <LogOut />
              Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
