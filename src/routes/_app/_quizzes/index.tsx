import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PenSquare, Trash2, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { FORM_DATA } from "@/data/form";
import type { TQuizSchema } from "./-types";
import { SearchSchema } from "./-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import AppTable from "@/components/base/app-table";
import { useQuery } from "@tanstack/react-query";
import { useGetAllQuizzes } from "./-apis";

export const Route = createFileRoute("/_app/_quizzes/")({
  component: RouteComponent,
  validateSearch: SearchSchema,
});

// Demo data (fallback)
const DEMO_QUIZZES: TQuizSchema[] = [
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
  const [deleteForm, setDeleteForm] = useState(FORM_DATA);

  // Use the new queryOptions pattern
  const { data: quizzes = DEMO_QUIZZES } = useQuery(useGetAllQuizzes());

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
                <Link to="/quizzes/view/$id" params={{ id: quizId }}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/quizzes/edit/$id" params={{ id: quizId }}>
                  <PenSquare className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() =>
                  setDeleteForm({
                    ...FORM_DATA,
                    type: "delete",
                    title: quiz.title,
                    id: quiz.id,
                  })
                }
              >
                <Trash2 className="mr-2 h-4 w-4" />
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
      {/* Header with Create Button */}
      <div className="flex items-center justify-end">
        <Button size={"sm"} asChild>
          <Link to="/quizzes/create">
            <Plus className="mr-2 h-4 w-4" /> Add Quiz
          </Link>
        </Button>
      </div>

      {/* Table */}
      <AppTable data={quizzes} columns={columns} />

      {/* Delete Dialog */}
      <AlertDialog
        open={deleteForm.type === "delete"}
        onOpenChange={() => setDeleteForm(FORM_DATA)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to{" "}
              <span className="font-semibold text-destructive">delete </span>{" "}
              <span className="font-semibold">{deleteForm.title}</span>? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="capitalize min-w-24">
              Cancel
            </AlertDialogCancel>
            <Button
              variant="destructive"
              className="flex items-center gap-2 min-w-24 capitalize"
              onClick={() => {
                setDeleteForm(FORM_DATA);
              }}
            >
              <Trash2 /> Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
