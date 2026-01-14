import { CardContent } from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

import { useQuery } from "@tanstack/react-query";
import { useGetQuiz } from "../-apis";
import { Loader2 } from "lucide-react";
import { getImageUrl } from "@/utils";

type TProps = {
  form_data: { id: string | number; type: string };
};

export default function CardQuiz({ form_data }: TProps) {
  const { data: quiz, isLoading } = useQuery(useGetQuiz(form_data.id));

  if (isLoading) {
    return (
      <CardContent className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </CardContent>
    );
  }

  if (!quiz) {
    return (
      <CardContent className="py-20 text-center text-muted-foreground">
        No quiz data found.
      </CardContent>
    );
  }

  return (
    <CardContent className="space-y-6 overflow-y-auto">
      <div className="grid gap-6">
        <section className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium">Name</div>
              <div className="text-sm text-muted-foreground">
                {quiz.name || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Title</div>
              <div className="text-sm text-muted-foreground">
                {quiz.title || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Heading</div>
              <div className="text-sm text-muted-foreground">
                {quiz.heading || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">CTA Text</div>
              <div className="text-sm text-muted-foreground">
                {quiz.cta_text || "N/A"}
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Description</div>
            <div
              className="text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: quiz.description || "" }}
            />
          </div>
          <div>
            <div className="text-sm font-medium">Footer Text</div>
            <div
              className="text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: quiz.landing_page_text || "" }}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Design</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium mb-2">Logo</div>
              {quiz.logo ? (
                <img
                  src={getImageUrl(quiz.logo)}
                  alt="Logo"
                  className="max-h-32 rounded-md border"
                />
              ) : (
                <div className="w-full h-32 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">No Logo</span>
                </div>
              )}
            </div>
            <div>
              <div className="text-sm font-medium mb-2">Background</div>
              {quiz.background_image ? (
                <img
                  src={getImageUrl(quiz.background_image)}
                  alt="Background"
                  className="max-h-32 rounded-md border"
                />
              ) : (
                <div className="w-full h-32 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">
                    No Background
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium mb-2">Primary Color</div>
              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-md border"
                  style={{ backgroundColor: quiz.primary_color }}
                ></div>
                <span className="text-sm">{quiz.primary_color}</span>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-2">Secondary Color</div>
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

        <section className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-lg font-semibold">Questions</h3>
            <Badge variant="outline">
              {quiz.questions?.length || 0} Questions
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
                          Answers & Points
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
                                <Badge
                                  variant="secondary"
                                  className="font-mono"
                                >
                                  {answer.points} pts
                                </Badge>
                              </div>
                            )
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
              No questions added yet.
            </div>
          )}
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-lg font-semibold">Result Pages</h3>
            <Badge variant="outline">
              {quiz.resultPages?.length || 0} Pages
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
                      {page.title} ({page.min_score} - {page.max_score} pts)
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
              No result pages added yet.
            </div>
          )}
        </section>

        {(quiz.leadFormSetting || quiz.resultDeliverySetting) && (
          <section className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Settings</h3>
            {quiz.leadFormSetting && (
              <div className="space-y-2">
                <div className="text-sm font-medium">Lead Form Fields</div>
                <div className="flex flex-wrap gap-2">
                  {quiz.leadFormSetting.fields.map((field: any, i: number) => (
                    <Badge key={i} variant="secondary">
                      {field.label} ({field.type})
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {quiz.resultDeliverySetting && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm font-medium">Email Result</div>
                  <Badge
                    variant={
                      quiz.resultDeliverySetting.enable_email_result
                        ? "default"
                        : "secondary"
                    }
                  >
                    {quiz.resultDeliverySetting.enable_email_result
                      ? "Enabled"
                      : "Disabled"}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm font-medium">PDF Download</div>
                  <Badge
                    variant={
                      quiz.resultDeliverySetting.enable_pdf_download
                        ? "default"
                        : "secondary"
                    }
                  >
                    {quiz.resultDeliverySetting.enable_pdf_download
                      ? "Enabled"
                      : "Disabled"}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm font-medium">Link Share</div>
                  <Badge
                    variant={
                      quiz.resultDeliverySetting.enable_link_share
                        ? "default"
                        : "secondary"
                    }
                  >
                    {quiz.resultDeliverySetting.enable_link_share
                      ? "Enabled"
                      : "Disabled"}
                  </Badge>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </CardContent>
  );
}
