import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  PenSquare,
  Trash2,
  Plus,
  Eye,
  Settings,
  MoreHorizontal,
  FileQuestionMark,
  FileText,
  Users,
  BarChart,
  Copy,
  Loader2,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent } from "@/components/ui/card";
import { FORM_DATA } from "@/data/form";
import type { TQuizSchema } from "./-types";
import { SearchSchema } from "./-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import AppTable from "@/components/base/app-table";
import AppSearch from "@/components/base/app-search";
import AppPagination from "@/components/base/app-pagination";
import { useQuery } from "@tanstack/react-query";
import { useGetAllQuizzes, useDeleteQuiz, useGetEmbedCode } from "./-apis";
import AppButtonText from "@/components/base/app-button-text";
import AppDeleteDialog from "@/components/base/app-delete-dialog";
import { DEFAULT_PAGINATION, FRONTEND_URL } from "@/consts";
import { useActiveQuiz } from "@/store";
import AppLoading from "@/components/base/app-loading";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_app/")({
  component: RouteComponent,
  validateSearch: SearchSchema,
});

// Demo data (fallback)

export default function RouteComponent() {
  const { t } = useTranslation();
  const { setActiveQuiz } = useActiveQuiz();
  useEffect(() => {
    setActiveQuiz({ quiz: { id: "", name: "" } });
  }, []);

  const navigate = useNavigate({ from: Route.fullPath });
  const search = Route.useSearch();
  const [searchValue, setSearchValue] = useState(search.search || "");
  const [deleteForm, setDeleteForm] = useState(FORM_DATA);
  const [embedForm, setEmbedForm] = useState<{
    type: "open" | "closed";
    id: string;
  }>({ type: "closed", id: "" });
  // Use the new queryOptions pattern
  const { data: response, isLoading } = useQuery(useGetAllQuizzes(search));
  const { data: embedResponse, isLoading: embedLoading } = useQuery(
    useGetEmbedCode(embedForm.id),
  );

  const quizzes = response?.data ?? [];
  console.log("👉 ~ RouteComponent ~ quizzes:", quizzes);
  const meta = response?.meta;

  const { mutate: deleteQuiz, isPending: isDeletePending } = useDeleteQuiz();
  const handleConfirmDelete = () => {
    if (!deleteForm.id) return;
    deleteQuiz(
      { id: deleteForm.id },
      {
        onSuccess: () => {
          setDeleteForm(FORM_DATA);
        },
      },
    );
  };
  // const handelSetActiveQuiz = (quiz: TQuizSchema) => {
  //   setActiveQuiz({ quiz });
  // };

  // Column definitions
  const columns: ColumnDef<TQuizSchema>[] = [
    {
      header: t("quizzes.tableName"),
      accessorKey: "name",
    },
    {
      header: t("quizzes.tableTitle"),
      accessorKey: "title",
    },
    {
      header: t("quizzes.tableDescription"),
      accessorKey: "description",
      cell: ({ row }) => {
        const description = row.getValue("description") as string;
        return (
          <div className="max-w-sm truncate" title={description}>
            {description}
          </div>
        );
      },
    },
    {
      header: t("quizzes.tableViews"),
      accessorKey: "views",
    },
    {
      header: t("quizzes.tableUrl"),
      accessorKey: "uuid",
      cell: ({ row }) => {
        const data = row.getValue("uuid") as string;
        const uuid = `${FRONTEND_URL}/?quiz_id=${data}`;

        return (
          <div className="flex items-center gap-3 whitespace-nowrap">
            <span className="font-medium text-foreground">{uuid}</span>
            <Copy
              className="size-4 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(uuid);
                toast.success(`${uuid} copied`);
              }}
            />
          </div>
        );
      },
      size: 180,
    },

    {
      header: t("quizzes.tableTools"),
      accessorKey: "tools",
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
              <DropdownMenuItem
                onClick={() => setEmbedForm({ type: "open", id: quiz.uuid })}
              >
                <div className="flex items-center gap-2">
                  <Code2 />
                  {t("common.embed")}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild onClick={() => setActiveQuiz({ quiz })}>
                <Link to="/quizzes/$id/view" params={{ id: quizId }}>
                  <Eye />
                  {t("common.view")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild onClick={() => setActiveQuiz({ quiz })}>
                <Link to="/quizzes/$id/edit" params={{ id: quizId }}>
                  <PenSquare />
                  {t("common.edit")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild onClick={() => setActiveQuiz({ quiz })}>
                <Link
                  to="/quizzes/$id/settings"
                  params={{ id: quizId }}
                  search={{ tab: "lead-form" }}
                >
                  <Settings />
                  {t("common.settings")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild onClick={() => setActiveQuiz({ quiz })}>
                <Link
                  to="/quizzes/$id/questions"
                  params={{ id: quizId }}
                  search={DEFAULT_PAGINATION}
                >
                  <FileQuestionMark />
                  {t("quizzes.questions")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild onClick={() => setActiveQuiz({ quiz })}>
                <Link
                  to="/quizzes/$id/result-pages"
                  params={{ id: quizId }}
                  search={DEFAULT_PAGINATION}
                >
                  <FileText />
                  {t("quizzes.resultPages")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild onClick={() => setActiveQuiz({ quiz })}>
                <Link
                  to="/quizzes/$id/leads"
                  params={{ id: quizId }}
                  search={DEFAULT_PAGINATION}
                >
                  <Users />
                  {t("quizzes.leadsAndResults")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild onClick={() => setActiveQuiz({ quiz })}>
                <Link to="/quizzes/$id/statistics" params={{ id: quizId }}>
                  <BarChart />
                  {t("quizzes.statistics")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() =>
                  setDeleteForm({
                    ...FORM_DATA,
                    type: "delete",
                    title: quiz.title,
                    id: quizId,
                  })
                }
              >
                <Trash2 />
                {t("common.delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 100,
    },
  ];

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
              placeholder: t("quizzes.searchPlaceholder"),
              value: searchValue,
              onChange: (e) => setSearchValue(e.target.value),
            },
          }}
        />
        <Button asChild variant={"outline"}>
          <Link to="/quizzes/create" className="flex items-center">
            <Plus className="" />
            <AppButtonText>{t("quizzes.addQuiz")}</AppButtonText>
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto">
        {isLoading ? (
          <AppLoading />
        ) : (
          <div className="rounded-md border">
            <AppTable data={quizzes} columns={columns} />
          </div>
        )}
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
      {/* Delete Dialog */}
      <AppDeleteDialog
        open={deleteForm.type === "delete"}
        onOpenChange={() => setDeleteForm(FORM_DATA)}
        onConfirm={handleConfirmDelete}
        item_name={deleteForm.title}
        loading={isDeletePending}
      />
      <Dialog
        open={embedForm.type === "open"}
        onOpenChange={() => setEmbedForm({ type: "closed", id: "" })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Code2 />
              {t("quizzes.embedTitle")}
            </DialogTitle>
            <DialogDescription>
              {t("quizzes.embedDescription")}
            </DialogDescription>
          </DialogHeader>
          {embedLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <div className="mt-4 flex items-start gap-2 relative">
              <Textarea
                value={embedResponse?.embed_code}
                disabled
                className="min-h-[100px] resize-none overflow-y-auto"
              />
              <Copy
                className="size-4 cursor-pointer absolute top-2 right-2 z-10"
                onClick={() => {
                  navigator.clipboard.writeText(
                    embedResponse?.embed_code || "",
                  );
                  toast.success(`Code copied`);
                }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
