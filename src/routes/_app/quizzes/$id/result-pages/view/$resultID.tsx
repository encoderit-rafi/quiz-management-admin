import { createFileRoute, Link } from "@tanstack/react-router";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2, Pencil } from "lucide-react";
import AppButtonText from "@/components/base/app-button-text";
import AppLoading from "@/components/base/app-loading";
import { useQuery } from "@tanstack/react-query";
import {
  useGetResultPage,
  useGetResultPageRules,
  useCreateRule,
  useUpdateRule,
  useDeleteRule,
} from "../-apis";
import type { TResultPageRule, TResultPageRuleForm } from "../-apis";
import { useGetQuiz } from "@/routes/_app/-apis";
import { useGetQuizCategories } from "@/routes/_app/quizzes/$id/categories/-apis";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput, FormSelect } from "@/components/form";
import AppDeleteDialog from "@/components/base/app-delete-dialog";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute(
  "/_app/quizzes/$id/result-pages/view/$resultID",
)({
  component: ViewResultPage,
});

const RULE_TYPES = [
  { value: "top_category_is", label: "Top Category Is" },
  { value: "category_score_gt", label: "Category Score >" },
  { value: "category_score_gte", label: "Category Score >=" },
  { value: "category_score_lt", label: "Category Score <" },
  { value: "category_score_lte", label: "Category Score <=" },
  { value: "match_pct_gt", label: "Match % >" },
  { value: "match_pct_lt", label: "Match % <" },
  { value: "no_dominant_category", label: "No Dominant Category" },
];

const RULES_NEEDING_THRESHOLD = [
  "category_score_gt",
  "category_score_gte",
  "category_score_lt",
  "category_score_lte",
  "match_pct_gt",
  "match_pct_lt",
  "no_dominant_category",
];

const RULES_NEEDING_CATEGORY = [
  "top_category_is",
  "category_score_gt",
  "category_score_gte",
  "category_score_lt",
  "category_score_lte",
  "match_pct_gt",
  "match_pct_lt",
];

const RuleFormSchema = z.object({
  priority: z.coerce.number().min(0).default(0),
  rule_type: z.string().min(1, "Rule type is required"),
  category_id: z.coerce.number().nullable().optional(),
  threshold: z.coerce.number().nullable().optional(),
});

type TRuleFormSchema = z.infer<typeof RuleFormSchema>;

type RuleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resultPageId: string | number;
  quizId: string | number;
  rule?: TResultPageRule | null;
};

function RuleDialog({
  open,
  onOpenChange,
  resultPageId,
  quizId,
  rule,
}: RuleDialogProps) {
  const { data: categories = [] } = useQuery(useGetQuizCategories(quizId));

  const createMutation = useCreateRule(resultPageId);
  const updateMutation = useUpdateRule(resultPageId);
  const isEditing = !!rule;

  const form = useForm<TRuleFormSchema>({
    resolver: zodResolver(RuleFormSchema) as any,
    defaultValues: rule
      ? {
          priority: rule.priority,
          rule_type: rule.rule_type,
          category_id: rule.category_id ?? undefined,
          threshold: rule.threshold ?? undefined,
        }
      : { priority: 0, rule_type: "", category_id: undefined, threshold: undefined },
  });

  const { control, handleSubmit, watch, reset } = form;
  const ruleType = watch("rule_type");

  useEffect(() => {
    if (rule) {
      reset({
        priority: rule.priority,
        rule_type: rule.rule_type,
        category_id: rule.category_id ?? undefined,
        threshold: rule.threshold ?? undefined,
      });
    } else {
      reset({ priority: 0, rule_type: "", category_id: undefined, threshold: undefined });
    }
  }, [rule, reset]);
  const needsCategory = RULES_NEEDING_CATEGORY.includes(ruleType);
  const needsThreshold = RULES_NEEDING_THRESHOLD.includes(ruleType);

  const onSubmit = (data: any) => {
    const payload: TResultPageRuleForm = {
      priority: data.priority,
      rule_type: data.rule_type,
      category_id: needsCategory ? data.category_id : null,
      threshold: needsThreshold ? data.threshold : null,
    };

    if (isEditing && rule) {
      updateMutation.mutate(
        { id: rule.id, data: payload },
        {
          onSuccess: () => {
            onOpenChange(false);
            reset();
          },
        },
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          onOpenChange(false);
          reset();
        },
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  const categoryOptions = categories.map((c) => ({
    value: String(c.id),
    label: c.name,
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Rule" : "Add Rule"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            name="priority"
            control={control}
            label="Priority (lower = evaluated first)"
            type="number"
            placeholder="0"
          />
          <FormSelect
            name="rule_type"
            control={control}
            label="Rule Type"
            options={RULE_TYPES}
            placeholder="Select rule type"
          />
          {needsCategory && categoryOptions.length > 0 && (
            <FormSelect
              name="category_id"
              control={control}
              label="Category"
              options={categoryOptions}
              placeholder="Select category"
            />
          )}
          {needsThreshold && (
            <FormInput
              name="threshold"
              control={control}
              label={ruleType.includes("pct") ? "Threshold (%)" : "Threshold (score)"}
              type="number"
              placeholder="0"
            />
          )}
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
              {isEditing ? "Update" : "Add Rule"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ViewResultPage() {
  const { id, resultID } = Route.useParams();
  const { data: resultPage, isLoading } = useQuery(useGetResultPage(resultID));
  const { data: quiz } = useQuery(useGetQuiz(id));
  const isCategoryMode = quiz?.scoring_mode === "category";

  const { data: rules = [], isLoading: isRulesLoading } = useQuery({
    ...useGetResultPageRules(resultID),
    enabled: isCategoryMode,
  });
  const { data: categories = [] } = useQuery({
    ...useGetQuizCategories(id),
    enabled: isCategoryMode,
  });

  const deleteMutation = useDeleteRule(resultID);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<TResultPageRule | null>(null);
  const [deleteRuleId, setDeleteRuleId] = useState<number | null>(null);

  const getCategoryName = (id: number | null) => {
    if (!id) return "—";
    return categories.find((c) => c.id === id)?.name ?? String(id);
  };

  if (!resultPage && !isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Result page not found.</p>
      </div>
    );
  }

  return (
    <>
      <CardHeader className="flex items-center gap-2 justify-end">
        <Button asChild variant={"outline"}>
          <Link
            to="/quizzes/$id/result-pages/edit/$resultID"
            params={{ id, resultID }}
          >
            <Edit />
            <AppButtonText>Edit Result Page</AppButtonText>
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {isLoading ? (
          <AppLoading />
        ) : (
          <div className="grid gap-6">
            <section className="space-y-4">
              <div
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: resultPage?.content || "" }}
              />
            </section>

            {isCategoryMode && (
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="text-lg font-semibold">Matching Rules</h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingRule(null);
                      setDialogOpen(true);
                    }}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Rule
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  All rules must pass (AND logic) for this result page to be
                  shown. Pages are evaluated in ascending priority order.
                </p>

                {isRulesLoading ? (
                  <AppLoading />
                ) : rules.length === 0 ? (
                  <div className="text-center py-6 border rounded-lg border-dashed text-muted-foreground text-sm">
                    No rules defined. This result page will never be matched.
                    Add at least one rule.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {rules.map((rule) => (
                      <div
                        key={rule.id}
                        className="flex items-center justify-between p-3 rounded-md border bg-muted/20"
                      >
                        <div className="flex items-center gap-3 flex-wrap">
                          <Badge variant="outline" className="font-mono text-xs">
                            P{rule.priority}
                          </Badge>
                          <span className="text-sm font-medium">
                            {RULE_TYPES.find((r) => r.value === rule.rule_type)
                              ?.label ?? rule.rule_type}
                          </span>
                          {rule.category_id && (
                            <Badge variant="secondary" className="text-xs">
                              {getCategoryName(rule.category_id)}
                            </Badge>
                          )}
                          {rule.threshold !== null && (
                            <span className="text-sm text-muted-foreground">
                              {rule.threshold}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={() => {
                              setEditingRule(rule);
                              setDialogOpen(true);
                            }}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => setDeleteRuleId(rule.id)}
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
          </div>
        )}
      </CardContent>

      <RuleDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingRule(null);
        }}
        resultPageId={resultID}
        quizId={id}
        rule={editingRule}
      />

      <AppDeleteDialog
        open={!!deleteRuleId}
        onOpenChange={(open) => !open && setDeleteRuleId(null)}
        item_name="this rule"
        loading={deleteMutation.isPending}
        onConfirm={() => {
          if (deleteRuleId !== null) {
            deleteMutation.mutate(deleteRuleId, {
              onSuccess: () => setDeleteRuleId(null),
            });
          }
        }}
      />
    </>
  );
}
