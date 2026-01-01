import { CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useGetQuiz } from "../-apis";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

type TProps = {
  form_data: { id: string | number; type: string };
};

export default function CardQuiz({ form_data }: TProps) {
  const { id } = form_data;

  const { data: quiz, isLoading } = useQuery({
    ...useGetQuiz(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <CardContent>Loading quiz details...</CardContent>;
  }

  if (!quiz) {
    return <CardContent>No quiz data found.</CardContent>;
  }

  return (
    <CardContent className="space-y-6 overflow-y-auto">
      <div className="grid gap-6">
        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">
            General Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium">Quiz Name</div>
              <div className="text-sm text-muted-foreground">
                {quiz.quiz_name || "N/A"}
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
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Design</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium mb-2">Logo</div>
              {quiz.logo ? (
                <img
                  src={quiz.logo}
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
                  src={quiz.background_image}
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
                      {question.name}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-8 space-y-2">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Options & Points
                      </div>
                      <div className="grid gap-2">
                        {question.options?.map(
                          (option: any, optIndex: number) => (
                            <div
                              key={optIndex}
                              className="flex items-center justify-between p-2 rounded-md bg-muted/30 border border-transparent hover:border-muted-foreground/20 transition-colors"
                            >
                              <span className="text-sm">{option.label}</span>
                              <Badge variant="secondary" className="font-mono">
                                {option.points} pts
                              </Badge>
                            </div>
                          )
                        )}
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
      </div>
    </CardContent>
  );
}
