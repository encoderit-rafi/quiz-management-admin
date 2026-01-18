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
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import AppDeleteDialog from "@/components/base/app-delete-dialog";
import {
  useGetQuizQuestions,
  useDeleteQuestion,
  useArrangeOrder,
} from "./-apis";
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
  const [searchValue, setSearchValue] = useState(search.search || "");

  const { data, isLoading, refetch } = useQuery(
    useGetQuizQuestions(id, search)
  );

  const [localQuestions, setLocalQuestions] = useState<TQuizQuestion[]>([]);

  useEffect(() => {
    if (data?.data) {
      setLocalQuestions(data.data);
    }
  }, [data]);

  const meta = data?.meta;

  const [deleteForm, setDeleteForm] = useState<{
    id: number | string;
    name: string;
  } | null>(null);
  const deleteMutation = useDeleteQuestion(id);

  const handleDelete = () => {
    if (deleteForm?.id && deleteForm.name) {
      deleteMutation.mutate(deleteForm.id, {
        onSuccess: () => {
          setDeleteForm(null);
          refetch();
        },
      });
    }
  };

  const arrangeQuestionMutation = useArrangeOrder("Question", () => refetch());

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setLocalQuestions((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);

      // Call API to persist order
      arrangeQuestionMutation.mutate(newItems.map((i) => i.id));

      return newItems;
    });
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

    const arrangeAnswerMutation = useArrangeOrder("Answer", () => refetch());

    const handleOptionDragEnd = (event: any) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = question.answers.findIndex((i) => i.id === active.id);
      const newIndex = question.answers.findIndex((i) => i.id === over.id);
      const newAnswers = arrayMove(question.answers, oldIndex, newIndex);

      // Call API to persist order
      arrangeAnswerMutation.mutate(newAnswers.map((i) => i.id));

      // Local update for immediate feedback
      setLocalQuestions((prev) =>
        prev.map((q) =>
          q.id === question.id ? { ...q, answers: newAnswers } : q
        )
      );
    };

    return (
      <AccordionItem
        ref={setNodeRef}
        style={style}
        key={question.id}
        value={String(question.id)}
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
            <Badge variant="outline" className="mr-2">
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
                    <PenSquare className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  // className="text-destructive focus:text-destructive"
                  variant="destructive"
                  onClick={() => {
                    setDeleteForm({
                      id: question.id,
                      name: question.question_text,
                    });
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <AccordionContent className="px-4 pb-4">
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
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <AppSearch
          onSearch={() => {
            navigate({
              search: { ...search, search: searchValue, page: 1 },
              replace: true,
            });
          }}
          onClear={() => {
            setSearchValue("");
            navigate({
              search: { ...search, search: "", page: 1 },
              replace: true,
            });
          }}
          props={{
            input: {
              placeholder: "Search question...",
              value: searchValue,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchValue(e.target.value);
              },
            },
          }}
        />
        <Button asChild variant={"outline"}>
          <Link
            to="/quizzes/$id/questions/create"
            params={{ id }}
            className="flex items-center"
          >
            <Plus className="" />
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
              items={localQuestions}
              strategy={verticalListSortingStrategy}
            >
              {localQuestions.map((question, index) => (
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
          onPageChange={(page: number) =>
            navigate({ search: { ...search, page }, replace: true })
          }
          onPerPageChange={(per_page: string) =>
            navigate({
              search: { ...search, per_page: Number(per_page), page: 1 },
              replace: true,
            })
          }
        />
      </div>

      <AppDeleteDialog
        open={!!deleteForm}
        onOpenChange={(open: boolean) => !open && setDeleteForm(null)}
        onConfirm={handleDelete}
        item_name={deleteForm?.name || ""}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
