import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Download, Eye, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetLeads, useExportLeads } from "./-apis";
import type { TLeadResultSchema } from "./-types";
import { LeadSearchSchema } from "./-types";
// import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import AppTable from "@/components/base/app-table";
// import AppSearch from "@/components/base/app-search";
import AppPagination from "@/components/base/app-pagination";
import AppButtonText from "@/components/base/app-button-text";
import AppLoading from "@/components/base/app-loading";

import { format } from "date-fns";
// import { ViewLeadDetail } from "./-components";
import { Badge } from "@/components/ui/badge";
import { CardHeader, CardContent } from "@/components/ui/card";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LeadCard } from "./-components";

export const Route = createFileRoute("/_app/quizzes/$id/leads/")({
  component: LeadsListPage,
  validateSearch: LeadSearchSchema,
});

function LeadsListPage() {
  const { t } = useTranslation();
  const { id } = Route.useParams();
  const navigate = useNavigate({ from: Route.fullPath });
  const search = Route.useSearch();

  const [leadID, setLeadID] = useState<string | number | null>(null);

  const { data: response = { data: [], meta: { total: 0 } }, isLoading } =
    useQuery(
      useGetLeads({
        quiz_id: id,
        ...search,
      }),
    );

  const leads = response?.data ?? [];
  const meta = response?.meta;

  const exportLeads = useExportLeads(id);

  // Column definitions
  const columns: ColumnDef<TLeadResultSchema>[] = [
    {
      header: t("leads.tableName"),
      accessorKey: "user_data.name",
      cell: ({ row }) => row.original.user_data.name || t("leads.anonymous"),
    },
    {
      header: t("leads.tableEmail"),
      accessorKey: "user_data.email",
      cell: ({ row }) =>
        row.original.user_data.email || t("leads.notAvailable"),
    },
    {
      header: t("leads.tableScore"),
      accessorKey: "total_score",
      cell: ({ row }) => (
        <Badge variant="outline" className="font-mono">
          {row.original.total_score} {t("quizzes.points")}
        </Badge>
      ),
    },
    {
      header: t("leads.tableResultPage"),
      accessorKey: "resultPage.title",
      cell: ({ row }) =>
        row.original.resultPage?.title || t("leads.notAvailable"),
    },
    {
      header: t("leads.tableDate"),
      accessorKey: "completed_at",
      cell: ({ row }) => {
        if (!row.original.completed_at) return t("leads.notAvailable");
        return format(new Date(row.original.completed_at), "PPP p");
      },
    },
    {
      header: t("leads.tableActions"),
      id: "actions",
      // cell: ({ row }) => <ViewLeadDetail id={row.original.id} />,
      cell: ({ row }) => (
        <Button
          onClick={() => setLeadID(row.original.id)}
          size={"icon"}
          variant={"ghost"}
        >
          <Eye />
        </Button>
      ),
    },
  ];

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-end gap-4">
        <Button
          onClick={exportLeads}
          variant={"outline"}
          className="flex items-center"
        >
          <Download className="" />
          <AppButtonText>{t("leads.exportCsv")}</AppButtonText>
        </Button>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto">
        {isLoading ? (
          <AppLoading />
        ) : (
          <div className="rounded-md border">
            <AppTable data={leads} columns={columns} />
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
      <Dialog open={leadID !== null} onOpenChange={() => setLeadID(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto max-w-4xl!">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <User className="h-5 w-5 text-primary" />
              {t("leads.detailsTitle")}
            </DialogTitle>
          </DialogHeader>
          <LeadCard id={leadID || ""} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
