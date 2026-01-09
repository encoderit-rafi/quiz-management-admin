import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  PenSquare,
  Trash2,
  Plus,
  Eye,
  Settings,
  MoreHorizontal,
  FileQuestionMark,
  FileText,
  Users,
  BarChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FORM_DATA } from "@/data/form";
import type { TQuizSchema } from "./-types";
import { SearchSchema } from "./-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import AppTable from "@/components/base/app-table";
import AppSearch from "@/components/base/app-search";
import AppPagination from "@/components/base/app-pagination";
import { useQuery } from "@tanstack/react-query";
import { useGetAllQuizzes } from "./-apis";
import AppButtonText from "@/components/base/app-button-text";
import AppDeleteDialog from "@/components/base/app-delete-dialog";
import { DEFAULT_PAGINATION } from "@/consts";
import { useSetRoute } from "@/hooks/use-set-route";

export const Route = createFileRoute("/_app/")({
  component: RouteComponent,
  validateSearch: SearchSchema,
});

// Demo data (fallback)
const DEMO_QUIZZES: TQuizSchema[] = [
  // ... (keeping demo data same as before, assuming it's used when API fails)
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics",
    logo: null,
    background_image: null,
    primary_color: "#3b82f6",
    secondary_color: "#8b5cf6",
    is_active: true,
  },
  {
    id: 2,
    title: "React Advanced Concepts",
    description: "Deep dive into React hooks, context, and performance",
    logo: null,
    background_image: null,
    primary_color: "#10b981",
    secondary_color: "#06b6d4",
    is_active: true,
  },
  {
    id: 3,
    title: "TypeScript Mastery",
    description: "Master TypeScript types, generics, and advanced patterns",
    logo: null,
    background_image: null,
    primary_color: "#f59e0b",
    secondary_color: "#ef4444",
    is_active: true,
  },
];

export default function RouteComponent() {
  const navigate = useNavigate({ from: Route.fullPath });
  const search = Route.useSearch();
  const [deleteForm, setDeleteForm] = useState(FORM_DATA);

  // Use the new queryOptions pattern
  const { data: quizzes = { data: DEMO_QUIZZES, meta: { total: 0 } } } =
    useQuery(useGetAllQuizzes(search));

  // Column definitions
  const columns: ColumnDef<TQuizSchema>[] = [
    {
      header: "Title",
      accessorKey: "title",
      cell: ({ row }) => (
        <div className="font-medium text-foreground">
          {row.getValue("title")}
        </div>
      ),
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: ({ row }) => {
        const description = row.getValue("description") as string;
        return (
          <div
            className="text-muted-foreground line-clamp-1 max-w-[400px]"
            dangerouslySetInnerHTML={{
              __html: description || "No description",
            }}
          />
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "action",
      cell: ({ row }) => {
        const quiz = row.original;
        const quizId = String(quiz.id);
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/quizzes/$id/view" params={{ id: quizId }}>
                  <Eye />
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/quizzes/$id/edit" params={{ id: quizId }}>
                  <PenSquare />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/quizzes/$id/settings" params={{ id: quizId }}>
                  <Settings />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/quizzes/$id/questions" params={{ id: quizId }}>
                  <FileQuestionMark />
                  Questions
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/quizzes/$id/result-pages"
                  params={{ id: quizId }}
                  search={DEFAULT_PAGINATION}
                >
                  <FileText />
                  Result Pages
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/quizzes/$id/leads" params={{ id: quizId }}>
                  <Users />
                  Leads & Results
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/quizzes/$id/statistics" params={{ id: quizId }}>
                  <BarChart />
                  Statistics
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() =>
                  setDeleteForm({
                    ...FORM_DATA,
                    type: "delete",
                    title: quiz.title,
                    id: quiz.id || "",
                  })
                }
              >
                <Trash2 />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 100,
    },
  ];

  useSetRoute({ name: "", path: "/" });

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between gap-4">
        <AppSearch
          props={{
            input: {
              placeholder: "Search quiz...",
              value: search.q,
              onChange: (e) => {
                navigate({
                  search: { ...search, q: e.target.value },
                  replace: true,
                });
              },
            },
          }}
        />
        <Button asChild>
          <Link to="/quizzes/create" className="flex items-center">
            <Plus />
            <AppButtonText>Add Quiz</AppButtonText>
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <AppTable data={quizzes?.data || DEMO_QUIZZES} columns={columns} />
      </div>

      <AppPagination
        total={quizzes?.meta?.total || 0}
        perPage={search.per_page}
        page={search.page}
        onPageChange={(page) =>
          navigate({ search: { ...search, page }, replace: true })
        }
        onPerPageChange={(per_page) =>
          navigate({
            search: { ...search, per_page: Number(per_page), page: 1 },
            replace: true,
          })
        }
      />
      {/* Delete Dialog */}
      <AppDeleteDialog
        open={deleteForm.type === "delete"}
        onOpenChange={() => setDeleteForm(FORM_DATA)}
        onConfirm={() => {}}
        item_name={deleteForm.title}
        loading={false}
      />
    </div>
  );
}
