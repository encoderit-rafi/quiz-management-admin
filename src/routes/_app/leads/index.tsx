import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadCard } from "./-components";
import { useGetLeads, useExportLeads } from "./-apis";
import type { TLeadResultSchema } from "./-types";

export const Route = createFileRoute("/_app/leads/")({
  component: LeadsListPage,
});

// Demo Data
const DEMO_LEADS: TLeadResultSchema[] = [
  {
    id: 1,
    quiz_title: "General Knowledge Quiz",
    user_email: "user@example.com",
    submission_date: "2024-05-15 14:30",
    total_score: 85,
    result_page: { name: "Success Page", min: 80, max: 100 },
    answers: [
      {
        question: "What is the capital of France?",
        answer: "Paris",
        points: 10,
      },
      {
        question: "Which planet is the Red Planet?",
        answer: "Mars",
        points: 10,
      },
    ],
  },
  {
    id: 2,
    quiz_title: "Product Feedback Survey",
    user_email: "feedback@test.com",
    submission_date: "2024-05-14 09:15",
    total_score: 45,
    result_page: { name: "Thank You (Low Score)", min: 0, max: 50 },
    answers: [
      {
        question: "How would you rate our service?",
        answer: "Average",
        points: 2,
      },
      { question: "Will you recommend us?", answer: "Maybe", points: 3 },
    ],
  },
  {
    id: 3,
    quiz_title: "Javascript Basics",
    user_email: "dev@code.com",
    submission_date: "2024-05-16 11:20",
    total_score: 100,
    result_page: { name: "Expert Developer", min: 90, max: 100 },
    answers: [
      { question: "What is 'typeof null'?", answer: "object", points: 10 },
      { question: "Is JS single-threaded?", answer: "Yes", points: 10 },
    ],
  },
];

function LeadsListPage() {
  const { data: leads } = useQuery({
    ...useGetLeads(),
    select: (data: any) =>
      Array.isArray(data) && data.length > 0 ? data : DEMO_LEADS,
  });

  const exportLeads = useExportLeads();

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads & Results</h1>
          <p className="text-muted-foreground">
            View submissions and export data.
          </p>
        </div>
        <Button onClick={exportLeads}>
          <Download className="mr-2 h-4 w-4" /> Export CSV
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
