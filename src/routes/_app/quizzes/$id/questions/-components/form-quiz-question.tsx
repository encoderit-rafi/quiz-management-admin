import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { useCreateQuestion, useGetQuestion, useUpdateQuestion } from "../-apis";
import { FormImageUpload, FormInput } from "@/components/form";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import type { TFormType, TPath } from "@/types";
import { CardAction, CardContent } from "@/components/ui/card";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { DEFAULT_PAGINATION } from "@/consts";
import {
  FormQuizQuestionSchema,
  type TFormQuizQuestionSchema,
} from "../-types";
import { useBreadcrumb } from "@/store/use-breadcrumb.store";

type TProps = {
  form_data: { id?: string | number; type: TFormType; quizId: string | number };
};

type SortableOptionProps = {
  id: string;
  index: number;
  control: any;
  onRemove: () => void;
};

function SortableOption({ id, index, control, onRemove }: SortableOptionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex gap-2 items-start">
      {/* Drag Handle */}
      <button
        type="button"
        className="cursor-grab active:cursor-grabbing touch-none p-1 hover:bg-muted rounded mt-1"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </button>

      <div className="flex-1">
        <FormInput
          name={`answers.${index}.answer_text`}
          control={control}
          placeholder="Option label"
        />
      </div>
      <div className="w-24">
        <FormInput
          name={`answers.${index}.points`}
          control={control}
          type="number"
          placeholder="Pts"
        />
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="mt-1 text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={onRemove}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function FormQuizQuestion({ form_data }: TProps) {
  const { id, type, quizId } = form_data;

  const router = useRouter();
  const { breadcrumb, setBreadcrumb } = useBreadcrumb();

  const navigate = useNavigate();

  // Fetch existing question
  const { data: question } = useQuery({
    ...useGetQuestion(id as string | number),
    enabled: !!id && type === "update",
  });

  const form = useForm<TFormQuizQuestionSchema>({
    resolver: zodResolver(FormQuizQuestionSchema) as any,
    defaultValues: {
      question_text: "",
      image: null,
      // is_active: true,
      answers: [{ answer_text: "", points: 0 }],
    },
  });

  const { reset, control, handleSubmit } = form;
  useEffect(() => {
    if (type == "create") {
      setBreadcrumb([
        breadcrumb[0],
        {
          name: "Questions",
          path: `/quizzes/${quizId}/questions` as TPath,
        },
        {
          name: "Create",
        },
      ]);
    } else if (type == "update") {
      setBreadcrumb([
        breadcrumb[0],
        {
          name: "Questions",
          path: `/quizzes/${quizId}/questions` as TPath,
        },
        {
          name: question?.question_text || "",
        },
        {
          name: "Edit",
        },
      ]);
    }
  }, [type, question]);
  useEffect(() => {
    if (type === "update" && question) {
      reset({
        question_text: question.question_text || question.name || "",
        image: question.image || null,
        // is_active: !!(question.is_active ?? true),
        answers: (question.answers || question.options || []).map(
          (opt: any) => ({
            answer_text: opt.answer_text || opt.label || "",
            points: opt.points ?? 0,
          })
        ),
      });
    }
  }, [question, type, reset]);

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "answers",
  });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((field) => field.id === active.id);
    const newIndex = fields.findIndex((field) => field.id === over.id);

    move(oldIndex, newIndex);
  };

  const { mutate: createQuestion, isPending: isCreating } =
    useCreateQuestion(quizId);
  const { mutate: updateQuestion, isPending: isUpdating } =
    useUpdateQuestion(quizId);

  const handleCancel = () => {
    router.history.back();
  };

  const onSubmit = (data: TFormQuizQuestionSchema) => {
    const payload = {
      ...data,
      quiz_id: quizId,
      answers: data.answers.map((o, index) => ({
        ...o,
        order: index,
      })),
      // is_active: true,
    };

    if (type === "update" && id) {
      updateQuestion(
        { ...payload, id },
        {
          onSuccess: () => {
            navigate({
              to: "/quizzes/$id/questions",
              params: { id: String(quizId) },
              search: DEFAULT_PAGINATION,
            });
          },
        }
      );
    } else {
      createQuestion(payload, {
        onSuccess: () => {
          navigate({
            to: "/quizzes/$id/questions",
            params: { id: String(quizId) },
            search: DEFAULT_PAGINATION,
          });
        },
      });
    }
  };

  return (
    <CardContent className="flex-1 flex flex-col overflow-hidden">
      <form
        id="quiz-question-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 flex-1 overflow-y-auto p-1 pr-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormImageUpload
            name="image"
            control={control}
            label="Question Image"
            description="Upload or drag a question image"
          />
          {/* <div className="flex items-center justify-end">
            <FormSwitch
              name="is_active"
              control={control}
              label="Active Status"
              description="Whether this question is active in the quiz"
            />
          </div> */}
        </div>

        <FormInput
          name="question_text"
          control={control}
          label="Question Text"
          placeholder="Enter question"
        />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Answers</label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ answer_text: "", points: 0 })}
            >
              <Plus className="h-3 w-3 mr-1" /> Add Answer
            </Button>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            <DndContext
              onDragEnd={handleDragEnd}
              collisionDetection={closestCenter}
            >
              <SortableContext
                items={fields}
                strategy={verticalListSortingStrategy}
              >
                {fields.map((field, index) => (
                  <SortableOption
                    key={field.id}
                    id={field.id}
                    index={index}
                    control={control}
                    onRemove={() => remove(index)}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </form>
      <CardAction className="pt-4 w-full flex justify-end items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="min-w-36"
          disabled={isCreating || isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="min-w-36"
          form="quiz-question-form"
          loading={isCreating || isUpdating}
        >
          {type === "update" ? "Update" : "Create"}
        </Button>
      </CardAction>
    </CardContent>
  );
}
