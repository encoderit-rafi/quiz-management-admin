import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, FileQuestion, Trophy } from "lucide-react";
import type { TLeadResultSchema } from "../-types";
import { Badge } from "@/components/ui/badge";

interface LeadCardProps {
  data: TLeadResultSchema;
}

export const LeadCard = ({ data }: LeadCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md border-border bg-card">
      <div className="p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <span className="text-sm font-medium leading-none tracking-tight text-muted-foreground">
            {data.quiz.name}
          </span>
          <FileQuestion className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <div className="text-2xl font-bold tabular-nums">
            {data.total_score}
          </div>
          <Trophy className="h-4 w-4 text-primary shrink-0" />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Result:{" "}
          <span className="text-foreground font-medium">
            {data.resultPage?.title || "N/A"}
          </span>
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full border-t">
        <AccordionItem value="answers" className="border-none">
          <AccordionTrigger className="flex h-10 w-full items-center justify-between px-6 py-2 transition-all hover:bg-muted/50 hover:no-underline text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Response Details
          </AccordionTrigger>
          <AccordionContent className="bg-muted/10 px-6 pb-4 pt-2">
            <div className="space-y-4">
              {data.answers.map((answer, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                      {index + 1}
                    </span>
                    <p className="text-sm font-medium leading-tight text-foreground/90">
                      {answer.question.question_text}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pl-6">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <CheckCircle className="size-3.5 text-primary" />
                      <span>Option ID: {answer.answer_id}</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-muted text-[10px] font-bold h-5 px-1.5"
                    >
                      +{answer.points_earned}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
