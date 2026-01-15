import { createFileRoute, Link } from "@tanstack/react-router";

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
import { FORM_DATA } from "@/data";
import { useBreadcrumb } from "@/store/use-breadcrumb.store";
import type { TPtah } from "@/types";

const DEMO_QUESTIONS = [
  {
    id: 1,
    name: "What is the capital of France?",
    options: [
      { id: "opt-1-1", label: "London", points: 0 },
      { id: "opt-1-2", label: "Berlin", points: 0 },
      { id: "opt-1-3", label: "Paris", points: 10 },
      { id: "opt-1-4", label: "Madrid", points: 0 },
    ],
  },
  {
    id: 2,
    name: "Which planet is known as the Red Planet?",
    options: [
      { id: "opt-2-1", label: "Mars", points: 10 },
      { id: "opt-2-2", label: "Venus", points: 0 },
      { id: "opt-2-3", label: "Jupiter", points: 0 },
      { id: "opt-2-4", label: "Saturn", points: 0 },
    ],
  },
  {
    id: 3,
    name: "Who wrote 'Romeo and Juliet'?",
    options: [
      { id: "opt-3-1", label: "Charles Dickens", points: 0 },
      { id: "opt-3-2", label: "William Shakespeare", points: 10 },
      { id: "opt-3-3", label: "Jane Austen", points: 0 },
      { id: "opt-3-4", label: "Mark Twain", points: 0 },
    ],
  },
];

export const Route = createFileRoute("/_app/quizzes/$id/questions/")({
  component: QuizQuestionsPage,
});

function QuizQuestionsPage() {
  // useSetRoute({ name: "Quiz Questions", path: Route.fullPath });

  const { id } = Route.useParams();
  // const navigate = useNavigate();

  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([
      { name: "View Quiz", path: `/quizzes/${id}/view/` as TPtah },
      { name: "Quiz Questions" },
    ]);
  }, []);

  const [deleteForm, setDeleteForm] = useState(FORM_DATA);

  const [questions, setQuestions] = useState(DEMO_QUESTIONS);
  const getQuestionPosition = (id: number) => {
    return questions.findIndex((q: any) => q.id === id);
  };
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    console.log("👉 ~ handleDragEnd ~ active, over:", active, over);
    if (active.id === over.id) return;
    setQuestions((questions) => {
      const oldPosition = getQuestionPosition(active.id);
      const newPosition = getQuestionPosition(over.id);
      return arrayMove(questions, oldPosition, newPosition);
    });
  };

  function SortableOption({ option }: { option: any }) {
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
        <span className="text-sm flex-1">{option.label}</span>
        <Badge variant="outline" className="font-mono text-xs">
          {option.points} pts
        </Badge>
      </div>
    );
  }

  function Question({ question, index }: { question: any; index: number }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: question.id });
    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };

    const handleOptionDragEnd = (event: any) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      setQuestions((currentQuestions) => {
        const updatedQuestions = [...currentQuestions];
        const questionToUpdate = updatedQuestions.find(
          (q) => q.id === question.id
        );

        if (questionToUpdate) {
          const oldIndex = questionToUpdate.options.findIndex(
            (opt: any) => opt.id === active.id
          );
          const newIndex = questionToUpdate.options.findIndex(
            (opt: any) => opt.id === over.id
          );

          const newOptions = [...questionToUpdate.options];
          const [movedOption] = newOptions.splice(oldIndex, 1);
          newOptions.splice(newIndex, 0, movedOption);
          questionToUpdate.options = newOptions;
        }

        return updatedQuestions;
      });
    };

    return (
      <AccordionItem
        ref={setNodeRef}
        style={style}
        key={index}
        value={`item-${index}`}
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
                  {index + 1}
                </span>
                <span className="font-medium line-clamp-1">
                  {question.name}
                </span>
              </span>
            </AccordionTrigger>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="mr-2">
              {question.options.length} Options
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
                    params={{ id: "1", questionID: "1" }}
                  >
                    <PenSquare />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => {
                    setDeleteForm({
                      type: "delete",
                      title: "Delete Question",
                      description:
                        "Are you sure you want to delete this question?",
                      id: question.id,
                    });
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
                  items={question.options}
                  strategy={verticalListSortingStrategy}
                >
                  {question.options.map((option: any) => (
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
      <CardHeader className="flex items-center justify-end gap-4">
        <Button asChild variant={"outline"}>
          <Link to="/quizzes/$id/questions/create" params={{ id }}>
            <Plus />
            <AppButtonText>Add Question</AppButtonText>
          </Link>
        </Button>
      </CardHeader>

      <CardContent>
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
                <Question question={question} index={index} />
              ))}
            </SortableContext>
          </DndContext>
        </Accordion>
        <AppDeleteDialog
          open={deleteForm.type === "delete"}
          onOpenChange={() => setDeleteForm(FORM_DATA)}
          onConfirm={() => {}}
          item_name={deleteForm.title}
          loading={false}
        />
      </CardContent>
    </div>
  );
}
