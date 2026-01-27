import { Card } from "@/components/ui/card";
import {
  CheckCircle,
  FileQuestion,
  Trophy,
  User,
  Phone,
  MapPin,
  Calendar,
  Clock,
  BarChart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGetLeadByID } from "../-apis";
import { useQuery } from "@tanstack/react-query";
import AppLoading from "@/components/base/app-loading";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

interface LeadCardProps {
  id: string | number;
}

export const LeadCard = ({ id }: LeadCardProps) => {
  const { data: lead, isLoading } = useQuery(useGetLeadByID(id));

  console.log("👉 ~ ViewLeadDetail ~ lead:", lead);

  if (isLoading || !lead) {
    return <AppLoading />;
  }

  const {
    user_data,
    quiz,
    answers,
    total_score,
    completed_at,
    started_at,
    ip_address,
  } = lead;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "PPP p");
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md border-border bg-card p-6">
      <div className="space-y-6">
        <section className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              User Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {user_data.name || "Anonymous"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user_data.phone || "N/A"}</span>
              </div>
              {user_data.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user_data.address}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Submission Meta
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    Completed At
                  </span>
                  <span className="text-sm">{formatDate(completed_at)}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    Started At
                  </span>
                  <span className="text-sm">{formatDate(started_at)}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BarChart className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    IP Address
                  </span>
                  <span className="text-sm">{ip_address || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Quiz Performance
              </h3>
              <p className="text-lg font-bold mt-1">{quiz.name}</p>
            </div>
            <div className="text-right">
              <span className="text-sm text-muted-foreground block">
                Total Score
              </span>
              <Badge variant="default" className="text-sm font-mono">
                {total_score}
              </Badge>
            </div>
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Response Details
          </h3>
          <div className="space-y-4">
            {quiz.questions.map((question, index) => {
              const selectedAnswersMeta = answers.filter(
                (a) => a.question_id === question.id.toString(),
              );

              const selectedAnswers = selectedAnswersMeta
                .map((meta) =>
                  question.answers.find(
                    (a) => a.id.toString() === meta.answer_id,
                  ),
                )
                .filter(Boolean);

              return (
                <div
                  key={question.id}
                  className="p-4 rounded-lg bg-muted/30 border border-muted/50 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {index + 1}
                    </span>
                    <div className="flex-1 space-y-3">
                      <div>
                        <p className="text-sm font-semibold leading-relaxed">
                          {question.question_text}
                        </p>
                      </div>

                      <div className="space-y-2">
                        {selectedAnswers.length > 0 ? (
                          selectedAnswers.map((ans, ansIdx) => (
                            <div
                              key={ansIdx}
                              className="rounded-md bg-background/50 p-3 border border-border/50"
                            >
                              <p className="text-xs text-muted-foreground mb-1 font-medium">
                                Selected Answer{" "}
                                {selectedAnswers.length > 1 ? ansIdx + 1 : ""}:
                              </p>
                              <p className="text-sm">{ans?.answer_text}</p>
                            </div>
                          ))
                        ) : (
                          <div className="rounded-md bg-background/50 p-3 border border-border/50 border-dashed">
                            <p className="text-sm text-muted-foreground italic">
                              No response
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <FileQuestion className="size-3.5" />
                          <span>Points Earned</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className="font-mono text-xs"
                        >
                          +
                          {selectedAnswersMeta.reduce(
                            (acc, curr) => acc + curr.points_earned,
                            0,
                          )}{" "}
                          pts
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
      {/* <div className="p-6">
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
      </Accordion> */}
    </Card>
  );
};
