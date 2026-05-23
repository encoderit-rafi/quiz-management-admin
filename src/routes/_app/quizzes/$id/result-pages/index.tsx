import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { GripVertical, Plus, Trash2, MoreHorizontal, Eye, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardHeader, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { closestCorners, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useQuery } from "@tanstack/react-query";
import {
  useGetResultPages,
  useDeleteResultPage,
  useArrangeResultPageOrder,
} from "./-apis";
import { useGetQuiz } from "@/routes/_app/-apis";
import type { TResultPageSchema } from "./-types";
import { ResultPageSearchSchema } from "./-types";
import { useEffect, useState } from "react";
import AppButtonText from "@/components/base/app-button-text";
import AppDeleteDialog from "@/components/base/app-delete-dialog";
import AppLoading from "@/components/base/app-loading";

export const Route = createFileRoute("/_app/quizzes/$id/result-pages/")({
  component: RouteComponent,
  validateSearch: ResultPageSearchSchema,
});

function SortableRow({
  page,
  isCategoryMode,
  onDelete,
}: {
  page: TResultPageSchema;
  isCategoryMode: boolean;
  onDelete: (id: number | string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: page.id! });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={isDragging ? "opacity-50" : ""}
    >
      <TableCell className="w-10">
        <button
          type="button"
          className="cursor-grab active:cursor-grabbing touch-none p-1 hover:bg-muted rounded"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </button>
      </TableCell>
      <TableCell className="font-medium">{page.title}</TableCell>
      {isCategoryMode ? (
        <TableCell>
          <Badge variant={(page.rules_count ?? 0) > 0 ? "default" : "outline"}>
            {page.rules_count ?? 0} {(page.rules_count ?? 0) === 1 ? "rule" : "rules"}
          </Badge>
        </TableCell>
      ) : (
        <TableCell>
          {page.min_score != null || page.max_score != null
            ? `${page.min_score ?? "?"} – ${page.max_score ?? "∞"}`
            : "—"}
        </TableCell>
      )}
      <TableCell>
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
                to="/quizzes/$id/result-pages/view/$resultID"
                params={{ id: String(page.quiz_id), resultID: String(page.id) }}
              >
                <Eye /> View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                to="/quizzes/$id/result-pages/edit/$resultID"
                params={{ id: String(page.quiz_id), resultID: String(page.id) }}
              >
                <PenSquare /> Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => onDelete(page.id!)}
            >
              <Trash2 /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default function RouteComponent() {
  const { t } = useTranslation();
  const { id } = Route.useParams();
  const search = Route.useSearch();
  const [deleteId, setDeleteId] = useState<number | string | null>(null);
  const [localPages, setLocalPages] = useState<TResultPageSchema[]>([]);

  const { data: resultPages = { data: [], meta: { total: 0 } }, isLoading } =
    useQuery(useGetResultPages({ ...search, quiz_id: id, per_page: 0 }));

  const { data: quiz } = useQuery(useGetQuiz(id));
  const isCategoryMode = quiz?.scoring_mode === "category";

  const deleteMutation = useDeleteResultPage();
  const arrangeMutation = useArrangeResultPageOrder();

  useEffect(() => {
    if (resultPages?.data) {
      setLocalPages(resultPages.data);
    }
  }, [resultPages.data]);

  const handleDelete = () => {
    if (deleteId !== null) {
      deleteMutation.mutate(deleteId);
      setDeleteId(null);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setLocalPages((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);

      arrangeMutation.mutate(newItems.map((i) => i.id!));

      return newItems;
    });
  };

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-end gap-4">
        <Button asChild variant="outline">
          <Link
            to="/quizzes/$id/result-pages/create"
            params={{ id: String(id) }}
            className="flex items-center"
          >
            <Plus />
            <AppButtonText>{t("quizzes.addResultPage")}</AppButtonText>
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto">
        {isLoading ? (
          <AppLoading />
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10" />
                  <TableHead>{t("quizzes.tableTitle")}</TableHead>
                  <TableHead>
                    {isCategoryMode ? "Rules" : t("quizzes.scoreRange")}
                  </TableHead>
                  <TableHead className="w-20" />
                </TableRow>
              </TableHeader>
              {localPages.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <DndContext
                  onDragEnd={handleDragEnd}
                  collisionDetection={closestCorners}
                >
                  <SortableContext
                    items={localPages.map((p) => p.id!)}
                    strategy={verticalListSortingStrategy}
                  >
                    <TableBody>
                      {localPages.map((page) => (
                        <SortableRow
                          key={page.id}
                          page={page}
                          isCategoryMode={isCategoryMode}
                          onDelete={(pid) => setDeleteId(pid)}
                        />
                      ))}
                    </TableBody>
                  </SortableContext>
                </DndContext>
              )}
            </Table>
          </div>
        )}
      </CardContent>

      <AppDeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        item_name={t("quizzes.resultPage")}
        loading={deleteMutation.isPending}
        onConfirm={handleDelete}
      />
    </div>
  );
}
