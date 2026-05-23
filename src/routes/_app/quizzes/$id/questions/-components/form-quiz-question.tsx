import { useEffect, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { useCreateQuestion, useGetQuestion, useUpdateQuestion } from "../-apis";
import { FormImageUpload, FormInput, FormSwitch } from "@/components/form";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import type { TFormType } from "@/types";
import { CardAction, CardContent } from "@/components/ui/card";
import AppLoading from "@/components/base/app-loading";

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
import { Label } from "@/components/ui/label";
import { useGetQuiz } from "@/routes/_app/-apis";
import { useGetQuizCategories } from "@/routes/_app/quizzes/$id/categories/-apis";
import type { TQuizCategorySchema } from "@/routes/_app/-types/quiz.type";

type TProps = {
  form_data: { id?: string | number; type: TFormType; quizId: string | number };
};

type SortableOptionProps = {
  id: string;
  index: number;
  control: any;
  onRemove: () => void;
  categories: TQuizCategorySchema[];
  isCategoryMode: boolean;
};

function SortableOption({
  id,
  index,
  control,
  onRemove,
  categories,
  isCategoryMode,
}: SortableOptionProps) {
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

      {isCategoryMode ? (
        <div className="flex flex-col gap-1 min-w-[200px]">
          {categories.map((cat, catIndex) => (
            <div key={cat.id} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-20 truncate">
                {cat.name}
              </span>
              <FormInput
                name={`answers.${index}.category_scores.${catIndex}.points`}
                control={control}
                type="number"
                placeholder="0"
                className="w-16"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-24">
          <FormInput
            name={`answers.${index}.points`}
            control={control}
            type="number"
            placeholder="Pts"
          />
        </div>
      )}

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
  const navigate = useNavigate();

  const { data: quiz } = useQuery({ ...useGetQuiz(quizId), enabled: !!quizId });
  const isCategoryMode = quiz?.scoring_mode === "category";

  const { data: categoriesData } = useQuery({
    ...useGetQuizCategories(quizId),
    enabled: isCategoryMode,
  });
  const categories = useMemo(() => categoriesData ?? [], [categoriesData]);

  const { data: question, isLoading: isFetchLoading } = useQuery({
    ...useGetQuestion(id as string | number),
    enabled: !!id && type === "update",
  });

  const form = useForm<TFormQuizQuestionSchema>({
    resolver: zodResolver(FormQuizQuestionSchema) as any,
    defaultValues: {
      question_text: "",
      image: null,
      multiselect: false,
      answers: [{ answer_text: "", points: 0, category_scores: [] }],
    },
  });

  const {
    reset,
    control,
    handleSubmit,
  } = form;
  useEffect(() => {
    if (type === "update" && question) {
      reset({
        question_text: question.question_text || question.name || "",
        image: question.image || null,
        multiselect: question.multiselect || false,
        answers: (question.answers || []).map((opt: any) => ({
          id: opt.id,
          answer_text: opt.answer_text || opt.label || "",
          points: opt.points ?? 0,
          category_scores: categories.map((cat) => {
            const existing = (opt.category_scores || []).find(
              (cs: any) => Number(cs.category_id) === Number(cat.id),
            );
            return { category_id: cat.id, points: existing?.points ?? 0 };
          }),
        })),
      });
    }
  }, [question, categories, type, reset]);

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
    const answers = data.answers.map((answer, index) => {
      const base: any = {
        ...answer,
        order: index,
      };

      if (isCategoryMode && categories.length > 0) {
        base.category_scores = categories.map((cat, catIndex) => ({
          category_id: cat.id,
          points: answer.category_scores?.[catIndex]?.points ?? 0,
        }));
        base.points = base.category_scores.reduce(
          (sum: number, cs: any) => sum + (cs.points || 0),
          0,
        );
      }

      return base;
    });

    const payload = {
      ...data,
      quiz_id: quizId,
      answers,
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
        },
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
        {isFetchLoading ? (
          <AppLoading />
        ) : (
          <>
            <div className="max-w-sm">
              <FormImageUpload
                name="image"
                control={control}
                label="Question Image"
                description="Upload or drag a question image"
              />
            </div>

            <FormInput
              name="question_text"
              control={control}
              label="Question Text"
              placeholder="Enter question"
            />
            <div className="flex items-center">
              <Label
                htmlFor="multiselect"
                className="text-sm font-medium text-nowrap"
              >
                <FormSwitch name="multiselect" control={control} />
                Answer Multiselect
              </Label>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Answers
                  {isCategoryMode && categories.length > 0 && (
                    <span className="ml-2 text-xs text-muted-foreground font-normal">
                      — enter points per category
                    </span>
                  )}
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({
                      answer_text: "",
                      points: 0,
                      category_scores: categories.map((cat) => ({
                        category_id: cat.id,
                        points: 0,
                      })),
                    })
                  }
                >
                  <Plus className="h-3 w-3 mr-1" /> Add Answer
                </Button>
              </div>

              {isCategoryMode && categories.length > 0 && (
                <div className="flex gap-2 text-xs text-muted-foreground pl-8">
                  <span className="flex-1">Answer Text</span>
                  {categories.map((cat) => (
                    <span key={cat.id} className="w-20 truncate text-center">
                      {cat.name}
                    </span>
                  ))}
                  <span className="w-8" />
                </div>
              )}

              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
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
                        categories={categories}
                        isCategoryMode={isCategoryMode}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              </div>

              {isCategoryMode && categories.length === 0 && (
                <p className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded p-3">
                  This quiz uses category-based scoring but has no categories
                  defined yet. Please add categories on the quiz overview page
                  first.
                </p>
              )}
            </div>
          </>
        )}
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
