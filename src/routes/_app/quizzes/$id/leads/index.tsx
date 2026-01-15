import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadCard } from "./-components";
import { useGetLeads, useExportLeads } from "./-apis";
import type { TLeadResultSchema } from "./-types";

export const Route = createFileRoute("/_app/quizzes/$id/leads/")({
  component: LeadsListPage,
});

function LeadsListPage() {
  const { data: leads } = useQuery({
    ...useGetLeads(),
    select: (data: any) => (Array.isArray(data) && data.length > 0 ? data : []),
  });

  const exportLeads = useExportLeads();

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-end">
        <Button onClick={exportLeads} variant={"outline"}>
          <Download /> Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
        {leads?.map((lead: TLeadResultSchema) => (
          <LeadCard key={lead.id} data={lead} />
        ))}
      </div>
    </div>
  );
}
