import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Plus, Trash2, MoreHorizontal, Eye, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { ColumnDef } from "@tanstack/react-table";
import AppTable from "@/components/base/app-table";
import { useQuery } from "@tanstack/react-query";
import { useGetResultPages, useDeleteResultPage } from "./-apis";
import type { TResultPageSchema } from "./-types";
import { ResultPageSearchSchema } from "./-types";
import { useState } from "react";
import AppSearch from "@/components/base/app-search";
import AppPagination from "@/components/base/app-pagination";
import AppButtonText from "@/components/base/app-button-text";
import AppDeleteDialog from "@/components/base/app-delete-dialog";
import { useSetRoute } from "@/hooks/use-set-route";

export const Route = createFileRoute("/_app/quizzes/$id/result-pages/")({
  component: RouteComponent,
  validateSearch: ResultPageSearchSchema,
});

// Demo data for fallback
const DEMO_RESULT_PAGES: TResultPageSchema[] = [
  {
    id: 1,
    name: "Success Page",
    min_score: 80,
    max_score: 100,
    content: "<p>Congratulations! You passed!</p>",
  },
  {
    id: 2,
    name: "Average Page",
    min_score: 50,
    max_score: 79,
    content: "<p>Good job, but keep practicing.</p>",
  },
  {
    id: 3,
    name: "Failure Page",
    min_score: 0,
    max_score: 50,
  },
];

export default function RouteComponent() {
  useSetRoute({ name: "Result Pages", path: Route.fullPath });
  const navigate = useNavigate({ from: Route.fullPath });
  const search = Route.useSearch();
  const [deleteId, setDeleteId] = useState<number | string | null>(null);

  const {
    data: resultPages = { data: DEMO_RESULT_PAGES, meta: { total: 0 } },
  } = useQuery(useGetResultPages(search));

  const deleteMutation = useDeleteResultPage();

  const handleDelete = () => {
    if (deleteId !== null) {
      deleteMutation.mutate(deleteId);
      setDeleteId(null);
    }
  };

  // Column definitions
  const columns: ColumnDef<TResultPageSchema>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Score Range",
      accessorKey: "min_score",
      cell: ({ row }) =>
        `${row.original.min_score} - ${row.original.max_score}%`,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const page = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  // to="/result-pages/view/$id"
                  to="/quizzes/$id/result-pages/view/$id"
                  params={{ id: String(page.id) }}
                >
                  <Eye /> View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/quizzes/$id/result-pages/edit/$id"
                  params={{ id: String(page.id) }}
                >
                  <PenSquare /> Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setDeleteId(page.id!)} // Just setting ID for now
              >
                <Trash2 /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
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
        <Button asChild>
          <Link
            to="/quizzes/$id/result-pages/create"
            params={{ id: "1" }}
            className="flex items-center"
          >
            <Plus />
            <AppButtonText>Add Result Page</AppButtonText>
          </Link>
        </Button>
      </div>

      <AppTable
        data={resultPages?.data || DEMO_RESULT_PAGES}
        columns={columns}
      />

      <AppPagination
        total={resultPages?.meta?.total || 0}
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

      <AppDeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        item_name="Result Page"
        loading={false}
        onConfirm={handleDelete}
      />
    </div>
  );
}
