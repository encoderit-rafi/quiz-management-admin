import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
import { useBreadcrumb } from "@/store/use-breadcrumb.store";

export const Route = createFileRoute("/_app/")({
  component: RouteComponent,
  validateSearch: SearchSchema,
});

// Demo data (fallback)

export default function RouteComponent() {
  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([]);
  }, []);
  const navigate = useNavigate({ from: Route.fullPath });
  const search = Route.useSearch();
  const [deleteForm, setDeleteForm] = useState(FORM_DATA);

  // Use the new queryOptions pattern
  const { data: response } = useQuery(useGetAllQuizzes(search));
  const quizzes = response?.data ?? [];
  const meta = response?.meta;

  // Column definitions
  const columns: ColumnDef<TQuizSchema>[] = [
    {
      header: "Quiz Name",
      accessorKey: "name",
    },
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Views",
      accessorKey: "views",
    },

    {
      header: "Tools",
      accessorKey: "tools",
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
                    id: quizId,
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
        <Button asChild variant={"outline"}>
          <Link to="/quizzes/create" className="flex items-center">
            <Plus />
            <AppButtonText>Add Quiz</AppButtonText>
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <AppTable data={quizzes} columns={columns} />
      </div>

      {meta && meta.last_page > 1 && (
        <AppPagination
          total={meta?.total || 0}
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
      )}
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
