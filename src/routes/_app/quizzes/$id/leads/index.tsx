import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetLeads, useExportLeads } from "./-apis";
import type { TLeadResultSchema } from "./-types";
import { LeadSearchSchema } from "./-types";
import { useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import AppTable from "@/components/base/app-table";
import AppSearch from "@/components/base/app-search";
import AppPagination from "@/components/base/app-pagination";
import AppButtonText from "@/components/base/app-button-text";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useGetQuiz } from "@/routes/_app/-apis";
import { useBreadcrumb } from "@/store/use-breadcrumb.store";
import type { TPath } from "@/types";

export const Route = createFileRoute("/_app/quizzes/$id/leads/")({
  component: LeadsListPage,
  validateSearch: LeadSearchSchema,
});

function LeadsListPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate({ from: Route.fullPath });
  const search = Route.useSearch();
  const [searchValue, setSearchValue] = useState(search.search || "");
  const { data: quiz } = useQuery(useGetQuiz(id));
  const { setBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumb([
      {
        name: quiz?.name || "",
        path: `/quizzes/${id}/view` as TPath,
      },
      {
        name: "Leads & Results",
      },
    ]);
  }, [quiz]);

  const { data: response = { data: [], meta: { total: 0 } } } = useQuery(
    useGetLeads({
      quiz_id: id,
      ...search,
    })
  );

  const leads = response?.data ?? [];
  const meta = response?.meta;

  const exportLeads = useExportLeads(id);

  // Column definitions
  const columns: ColumnDef<TLeadResultSchema>[] = [
    {
      header: "Email",
      accessorKey: "user_email",
      cell: ({ row }) => row.original.user_email || "N/A",
    },
    {
      header: "Submission Date",
      accessorKey: "submission_date",
      cell: ({ row }) => {
        const date = new Date(row.original.submission_date);
        return date.toLocaleString();
      },
    },
    {
      header: "Score",
      accessorKey: "total_score",
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.total_score} pts</Badge>
      ),
    },
    {
      header: "Result Page",
      accessorKey: "result_page",
      cell: ({ row }) => row.original.result_page?.name || "N/A",
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const lead = row.original;
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Submission Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">
                      {lead.user_email || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Score</div>
                    <div className="text-sm text-muted-foreground">
                      {lead.total_score} points
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Submission Date</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(lead.submission_date).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Result Page</div>
                    <div className="text-sm text-muted-foreground">
                      {lead.result_page?.name || "N/A"}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Answers</div>
                  <div className="space-y-2">
                    {lead.answers?.map((answer, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-md bg-muted/30 space-y-1"
                      >
                        <div className="text-sm font-medium">
                          {answer.question}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Answer: {answer.answer}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Points: {answer.points}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        );
      },
    },
  ];

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between gap-4">
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
              placeholder: "Search by email...",
              value: searchValue,
              onChange: (e) => setSearchValue(e.target.value),
            },
          }}
        />
        <Button onClick={exportLeads} variant={"outline"}>
          <Download />
          <AppButtonText>Export CSV</AppButtonText>
        </Button>
      </div>

      <div className="rounded-md border">
        <AppTable data={leads} columns={columns} />
      </div>

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
  );
}
