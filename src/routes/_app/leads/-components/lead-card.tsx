import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar, CheckCircle, Mail } from "lucide-react";
import type { TLeadResultSchema } from "../-types";

interface LeadCardProps {
  data: TLeadResultSchema;
}

export const LeadCard = ({ data }: LeadCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/40 pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="line-clamp-1">{data.quiz_title}</span>
            </CardTitle>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5" />
                <span>{data.submission_date}</span>
              </div>
              {data.user_email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5" />
                  <span>{data.user_email}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="default" className="text-sm px-3 py-1">
              Score: {data.total_score}
            </Badge>
            <Badge variant="outline" className="font-mono text-xs">
              Result: {data.result_page.name}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="answers" className="border-b-0">
            <AccordionTrigger className="px-6 py-3 hover:bg-muted/50 transition-colors">
              <span className="text-sm font-medium">View Answers</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-2">
              <div className="space-y-4">
                {data.answers.map((answer, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Q{index + 1}: {answer.question}
                    </p>
                    <div className="flex items-center justify-between mt-1.5 bg-muted/50 p-2 rounded text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-primary" />
                        <span>{answer.answer}</span>
                      </div>
                      <Badge variant="secondary" className="text-[10px] h-5">
                        {answer.points} pts
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
