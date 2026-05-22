import { CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { useQuery } from "@tanstack/react-query";
import { useGetQuiz } from "../-apis";
import AppLoading from "@/components/base/app-loading";
import { getImageUrl } from "@/utils";
import AppDeleteDialog from "@/components/base/app-delete-dialog";
import { FormInput } from "@/components/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import {
  useGetQuizCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "../quizzes/$id/categories/-apis";
import {
  QuizCategoryFormSchema,
  type TQuizCategoryFormSchema,
} from "../quizzes/$id/categories/-types";
import type { TQuizCategorySchema } from "../-types/quiz.type";

type TProps = {
  form_data: { id: string | number; type: string };
};

type CategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quizId: string | number;
  category?: TQuizCategorySchema | null;
};

function CategoryDialog({
  open,
  onOpenChange,
  quizId,
  category,
}: CategoryDialogProps) {
  const isEditing = !!category;
  const createMutation = useCreateCategory(quizId);
  const updateMutation = useUpdateCategory(quizId);

  const form = useForm<TQuizCategoryFormSchema>({
    resolver: zodResolver(QuizCategoryFormSchema) as any,
    defaultValues: { name: "", slug: "", description: "", order: 0 },
  });

  const { control, handleSubmit, reset, watch, setValue } = form;

  useEffect(() => {
    if (open) {
      reset(
        category
          ? { name: category.name, slug: category.slug, description: category.description ?? "", order: category.order }
          : { name: "", slug: "", description: "", order: 0 },
      );
    }
  }, [open, category, reset]);

  const nameValue = watch("name");
  useEffect(() => {
    const slug = nameValue
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s_-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    setValue("slug", slug, { shouldValidate: true });
  }, [nameValue, setValue]);

  const onSubmit = (data: any) => {
    if (isEditing && category) {
      updateMutation.mutate(
        { id: category.id, data },
        { onSuccess: () => onOpenChange(false) },
      );
    } else {
      createMutation.mutate(data, { onSuccess: () => onOpenChange(false) });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Category" : "Add Category"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            name="name"
            control={control}
            label="Name"
            placeholder="e.g. Interior"
          />
          {watch("slug") && (
            <p className="text-xs text-muted-foreground -mt-2">
              Slug: <span className="font-mono">{watch("slug")}</span>
            </p>
          )}
          <FormInput
            name="description"
            control={control}
            label="Description"
            placeholder="Optional description"
          />
          <FormInput
            name="order"
            control={control}
            label="Order"
            type="number"
            placeholder="0"
          />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" loading={isPending}>
              {isEditing ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function CardQuiz({ form_data }: TProps) {
  const { t } = useTranslation();
  const { data: quiz, isLoading } = useQuery(useGetQuiz(form_data.id));
  const isCategoryMode = quiz?.scoring_mode === "category";

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    ...useGetQuizCategories(form_data.id),
    enabled: isCategoryMode,
  });

  const deleteCategoryMutation = useDeleteCategory(form_data.id);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<TQuizCategorySchema | null>(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);

  if (isLoading) {
    return <AppLoading />;
  }

  if (!quiz) {
    return (
      <CardContent className="py-20 text-center text-muted-foreground">
        {t("common.noDataFound")}
      </CardContent>
    );
  }

  return (
    <CardContent className="space-y-6 overflow-y-auto">
      <div className="grid gap-6">
        <section className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium">
                {t("quizzes.details.name")}
              </div>
              <div className="text-sm text-muted-foreground">
                {quiz.name || t("leads.notAvailable")}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">
                {t("quizzes.details.title")}
              </div>
              <div className="text-sm text-muted-foreground">
                {quiz.title || t("leads.notAvailable")}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">
                {t("quizzes.details.heading")}
              </div>
              <div className="text-sm text-muted-foreground">
                {quiz.heading || t("leads.notAvailable")}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">
                {t("quizzes.details.ctaText")}
              </div>
              <div className="text-sm text-muted-foreground">
                {quiz.cta_text || t("leads.notAvailable")}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">
                {t("quizzes.details.submitButtonText")}
              </div>
              <div className="text-sm text-muted-foreground">
                {quiz?.submit_button_text || t("leads.notAvailable")}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">
                {t("quizzes.details.resultButtonText")}
              </div>
              <div className="text-sm text-muted-foreground">
                {quiz?.result_button_text || t("leads.notAvailable")}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Scoring Mode</div>
              <div className="mt-1">
                <Badge
                  variant={isCategoryMode ? "default" : "secondary"}
                >
                  {isCategoryMode ? "Category-Based" : "Total Score"}
                </Badge>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">
              {t("quizzes.tableDescription")}
            </div>
            <div
              className="text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: quiz.description || "" }}
            />
          </div>
          <div>
            <div className="text-sm font-medium">
              {t("quizzes.details.footerText")}
            </div>
            <div
              className="text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: quiz.landing_page_text || "" }}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">
            {t("quizzes.details.design")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium mb-2">
                {t("quizzes.details.logo")}
              </div>
              {quiz.logo ? (
                <img
                  src={getImageUrl(quiz.logo)}
                  alt="Logo"
                  className="max-h-32 rounded-md border"
                />
              ) : (
                <div className="w-full h-32 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">
                    {t("quizzes.details.noLogo")}
                  </span>
                </div>
              )}
            </div>
            <div>
              <div className="text-sm font-medium mb-2">
                {t("quizzes.details.background")}
              </div>
              {quiz.background_image ? (
                <img
                  src={getImageUrl(quiz.background_image)}
                  alt="Background"
                  className="max-h-32 rounded-md border"
                />
              ) : (
                <div className="w-full h-32 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">
                    {t("quizzes.details.noBackground")}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium mb-2">
                {t("quizzes.details.primaryColor")}
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-md border"
                  style={{ backgroundColor: quiz.primary_color }}
                ></div>
                <span className="text-sm">{quiz.primary_color}</span>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-2">
                {t("quizzes.details.secondaryColor")}
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-md border"
                  style={{ backgroundColor: quiz.secondary_color }}
                ></div>
                <span className="text-sm">{quiz.secondary_color}</span>
              </div>
            </div>
          </div>
        </section>

        {isCategoryMode && (
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-lg font-semibold">Categories</h3>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditingCategory(null);
                  setCategoryDialogOpen(true);
                }}
              >
                <Plus className="h-3 w-3 mr-1" /> Add Category
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Categories define the scoring axes for this quiz. Each answer
              can award points to one or more categories.
            </p>

            {isCategoriesLoading ? (
              <AppLoading />
            ) : categories.length === 0 ? (
              <div className="text-center py-6 border rounded-lg border-dashed text-muted-foreground text-sm">
                No categories yet. Add categories to enable category-based scoring.
              </div>
            ) : (
              <div className="space-y-2">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between p-3 rounded-md border bg-muted/20"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">{cat.name}</span>
                      {cat.description && (
                        <span className="text-xs text-muted-foreground max-w-[200px] truncate">
                          {cat.description}
                        </span>
                      )}
                      <Badge variant="outline" className="text-xs font-mono">
                        {cat.slug}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        order: {cat.order}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => {
                          setEditingCategory(cat);
                          setCategoryDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => setDeleteCategoryId(cat.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        <section className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-lg font-semibold">{t("quizzes.questions")}</h3>
            <Badge variant="outline">
              {quiz.questions?.length || 0} {t("quizzes.questions")}
            </Badge>
          </div>

          {quiz.questions && quiz.questions.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {quiz.questions.map((question: any, index: number) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <span className="flex items-center gap-2">
                      <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">
                        {index + 1}
                      </span>
                      {question.question_text}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-8 space-y-4">
                      {question.image && (
                        <img
                          src={getImageUrl(question.image)}
                          alt="Question"
                          className="max-h-40 rounded-md border"
                        />
                      )}
                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {t("quizzes.details.answersAndPoints")}
                        </div>
                        <div className="grid gap-2">
                          {question.answers?.map(
                            (answer: any, ansIndex: number) => (
                              <div
                                key={ansIndex}
                                className="flex items-center justify-between p-2 rounded-md bg-muted/30 border border-transparent hover:border-muted-foreground/20 transition-colors"
                              >
                                <span className="text-sm">
                                  {answer.answer_text}
                                </span>
                                {isCategoryMode &&
                                answer.category_scores?.length > 0 ? (
                                  <div className="flex gap-1 flex-wrap justify-end">
                                    {answer.category_scores.map(
                                      (cs: any, csIdx: number) => {
                                        const cat = categories.find(
                                          (c) => c.id === cs.category_id,
                                        );
                                        return (
                                          <Badge
                                            key={csIdx}
                                            variant="secondary"
                                            className="font-mono text-xs"
                                          >
                                            {cat?.name ?? cs.category_id}:{" "}
                                            {cs.points}
                                          </Badge>
                                        );
                                      },
                                    )}
                                  </div>
                                ) : (
                                  <Badge
                                    variant="secondary"
                                    className="font-mono"
                                  >
                                    {answer.points} {t("quizzes.points")}
                                  </Badge>
                                )}
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-8 text-muted-foreground border rounded-lg border-dashed">
              {t("quizzes.details.noQuestions")}
            </div>
          )}
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-lg font-semibold">
              {t("quizzes.resultPages")}
            </h3>
            <Badge variant="outline">
              {quiz.resultPages?.length || 0} {t("quizzes.pages")}
            </Badge>
          </div>

          {quiz.resultPages && quiz.resultPages.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {quiz.resultPages.map((page: any, index: number) => (
                <AccordionItem key={index} value={`page-${index}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <span className="flex items-center gap-2">
                      <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">
                        {index + 1}
                      </span>
                      {page.title}
                      {!isCategoryMode && (
                        <span className="text-xs text-muted-foreground">
                          ({page.min_score} - {page.max_score}{" "}
                          {t("quizzes.points")})
                        </span>
                      )}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-8 space-y-2">
                      <div
                        className="text-sm text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: page.content || "" }}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-8 text-muted-foreground border rounded-lg border-dashed">
              {t("quizzes.details.noResultPages")}
            </div>
          )}
        </section>

        {(quiz.leadFormSetting || quiz.resultDeliverySetting) && (
          <section className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">
              {t("common.settings")}
            </h3>
            {quiz.leadFormSetting && (
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  {t("quizzes.details.leadFormFields")}
                </div>
                <div className="flex flex-wrap gap-2">
                  {quiz.leadFormSetting.fields
                    .filter((field: any) => field.enabled)
                    .map((field: any, i: number) => (
                      <Badge key={i} variant="secondary">
                        {field.label}
                      </Badge>
                    ))}
                </div>
              </div>
            )}
            {quiz.resultDeliverySetting && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm font-medium">
                    {t("quizzes.details.emailResult")}
                  </div>
                  <Badge
                    variant={
                      quiz.resultDeliverySetting.enable_email_result
                        ? "default"
                        : "secondary"
                    }
                  >
                    {quiz.resultDeliverySetting.enable_email_result
                      ? t("common.enabled")
                      : t("common.disabled")}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm font-medium">
                    {t("quizzes.details.pdfDownload")}
                  </div>
                  <Badge
                    variant={
                      quiz.resultDeliverySetting.enable_pdf_download
                        ? "default"
                        : "secondary"
                    }
                  >
                    {quiz.resultDeliverySetting.enable_pdf_download
                      ? t("common.enabled")
                      : t("common.disabled")}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm font-medium">
                    {t("quizzes.details.linkShare")}
                  </div>
                  <Badge
                    variant={
                      quiz.resultDeliverySetting.enable_link_share
                        ? "default"
                        : "secondary"
                    }
                  >
                    {quiz.resultDeliverySetting.enable_link_share
                      ? t("common.enabled")
                      : t("common.disabled")}
                  </Badge>
                </div>
              </div>
            )}
          </section>
        )}
      </div>

      <CategoryDialog
        open={categoryDialogOpen}
        onOpenChange={(open) => {
          setCategoryDialogOpen(open);
          if (!open) setEditingCategory(null);
        }}
        quizId={form_data.id}
        category={editingCategory}
      />

      <AppDeleteDialog
        open={!!deleteCategoryId}
        onOpenChange={(open) => !open && setDeleteCategoryId(null)}
        item_name="this category"
        loading={deleteCategoryMutation.isPending}
        onConfirm={() => {
          if (deleteCategoryId !== null) {
            deleteCategoryMutation.mutate(deleteCategoryId, {
              onSuccess: () => setDeleteCategoryId(null),
            });
          }
        }}
      />
    </CardContent>
  );
}
