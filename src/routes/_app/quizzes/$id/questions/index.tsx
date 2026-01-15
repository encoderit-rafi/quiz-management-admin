import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  GripVertical,
  MoreHorizontalIcon,
  PenSquare,
  Plus,
  Trash2,
} from "lucide-react";
import { CardHeader, CardContent } from "@/components/ui/card";
import AppButtonText from "@/components/base/app-button-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { closestCorners, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import AppDeleteDialog from "@/components/base/app-delete-dialog";
// import { FORM_DATA } from "@/data";
import { useBreadcrumb } from "@/store/use-breadcrumb.store";
import type { TPtah } from "@/types";
import { useGetQuizQuestions, useDeleteQuestion } from "./-apis";
import { useQuery } from "@tanstack/react-query";
import type { TQuizAnswer, TQuizQuestion } from "./-types";
import { SearchSchema } from "../../../-types";
import AppSearch from "@/components/base/app-search";
import AppPagination from "@/components/base/app-pagination";

export const Route = createFileRoute("/_app/quizzes/$id/questions/")({
  component: QuizQuestionsPage,
  validateSearch: SearchSchema,
});

function QuizQuestionsPage() {
  const { id } = Route.useParams();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const { data, isLoading } = useQuery(useGetQuizQuestions(id, search));
  console.log("👉 ~ QuizQuestionsPage ~ data:", data);
  const questions = data?.data || [];
  const meta = data?.meta;

  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([
      { name: "View Quiz", path: `/quizzes/${id}/view/` as TPtah },
      { name: "Quiz Questions" },
    ]);
  }, [id, setBreadcrumb]);

  const [deleteId, setDeleteId] = useState<number | string | null>(null);
  const deleteMutation = useDeleteQuestion(id);

  const handleDelete = () => {
    if (deleteId !== null) {
      deleteMutation.mutate(deleteId, {
        onSuccess: () => {
          setDeleteId(null);
        },
      });
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    console.log("👉 ~ handleDragEnd ~ active, over:", active, over);
    if (!over || active.id === over.id) return;
    // Drag and drop logic for questions would go here if implemented on backend
  };

  function SortableOption({ option }: { option: TQuizAnswer }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: option.id });

    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex items-center gap-2 p-2 rounded-md bg-muted/30"
      >
        <button
          type="button"
          className="cursor-grab active:cursor-grabbing touch-none p-1 hover:bg-muted rounded"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-3 w-3 text-muted-foreground" />
        </button>
        <span className="text-sm flex-1">{option.answer_text}</span>
        <Badge variant="outline" className="font-mono text-xs">
          {option.points} pts
        </Badge>
      </div>
    );
  }

  if (isLoading) return <div>Loading...</div>;

  function Question({
    question,
    index,
  }: {
    question: TQuizQuestion;
    index: number;
  }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: question.id });
    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };

    const handleOptionDragEnd = (event: any) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      // Drag and drop logic for options would go here
    };

    return (
      <AccordionItem
        ref={setNodeRef}
        style={style}
        key={question.id}
        value={`item-${question.id}`}
        className="px-4 border-b last:border-0"
      >
        <div className="flex items-center gap-2 py-4">
          {/* Drag Handle */}
          <button
            className="cursor-grab active:cursor-grabbing touch-none p-1 hover:bg-muted rounded"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </button>
          <div className="flex-1">
            <AccordionTrigger className="hover:no-underline py-0">
              <span className="flex items-center gap-2 text-left">
                <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">
                  {index + 1 + (search.page - 1) * search.per_page}
                </span>
                <span className="font-medium line-clamp-1">
                  {question.question_text}
                </span>
              </span>
            </AccordionTrigger>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="mr-2">
              {question.answers.length} Options
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link
                    to="/quizzes/$id/questions/$questionID/edit"
                    params={{ id, questionID: String(question.id) }}
                  >
                    <PenSquare />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => {
                    setDeleteId(question.id);
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <AccordionContent className="pk-4 pb-4">
          <div className="pl-8 space-y-2">
            <div className="grid gap-2">
              <DndContext
                onDragEnd={handleOptionDragEnd}
                collisionDetection={closestCorners}
              >
                <SortableContext
                  items={question.answers}
                  strategy={verticalListSortingStrategy}
                >
                  {question.answers.map((option: TQuizAnswer) => (
                    <SortableOption key={option.id} option={option} />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4">
        <AppSearch
          props={{
            input: {
              placeholder: "Search question...",
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
          <Link to="/quizzes/$id/questions/create" params={{ id }}>
            <Plus />
            <AppButtonText>Add Question</AppButtonText>
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto">
        <Accordion type="multiple" className="w-full">
          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
          >
            <SortableContext
              items={questions}
              strategy={verticalListSortingStrategy}
            >
              {questions.map((question, index) => (
                <Question key={question.id} question={question} index={index} />
              ))}
            </SortableContext>
          </DndContext>
        </Accordion>
      </CardContent>

      <div className="p-4 border-t">
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
      </div>

      <AppDeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        item_name="Question"
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
