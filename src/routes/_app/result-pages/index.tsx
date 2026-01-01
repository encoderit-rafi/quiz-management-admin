import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Plus, Pencil, Trash2, MoreHorizontal, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import type { ColumnDef } from "@tanstack/react-table";
import AppTable from "@/components/base/app-table";
import { useQuery } from "@tanstack/react-query";
import { useGetResultPages, useDeleteResultPage } from "./-apis";
import type { TResultPageSchema } from "./-types";
import { useState } from "react";

export const Route = createFileRoute("/_app/result-pages/")({
  component: ResultPagesListPage,
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
    max_score: 49,
    content: "<p>Please try again.</p>",
  },
];

function ResultPagesListPage() {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState<string | number | null>(null);

  const { data: resultPages } = useQuery({
    ...useGetResultPages(),
    // Fallback to demo data if API returns empty/undefined (simulating for dev)
    select: (data) => (data?.data?.length ? data.data : DEMO_RESULT_PAGES),
  });

  const { mutate: deleteResultPage } = useDeleteResultPage();

  const handleDelete = () => {
    if (deleteId) {
      deleteResultPage(deleteId);
      setDeleteId(null);
    }
  };

  const columns: ColumnDef<TResultPageSchema>[] = [
    {
      accessorKey: "name",
      header: "Page Name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "range",
      header: "Score Range",
      cell: ({ row }) => {
        const min = row.original.min_score;
        const max = row.original.max_score;
        return (
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono bg-muted px-2 py-1 rounded w-fit">
            <span>{min}%</span>
            <span>-</span>
            <span>{max}%</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const page = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  navigate({
                    to: "/result-pages/view/$id",
                    params: { id: String(page.id) },
                  })
                }
              >
                <Eye className="mr-2 h-4 w-4" /> View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate({
                    to: "/result-pages/edit/$id",
                    params: { id: String(page.id) },
                  })
                }
              >
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setDeleteId(page.id!)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Result Pages</h1>
        <Button asChild>
          <Link to="/result-pages/create">
            <Plus className="mr-2 h-4 w-4" /> Add Result Page
          </Link>
        </Button>
      </div>

      <AppTable data={resultPages || DEMO_RESULT_PAGES} columns={columns} />

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              result page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
