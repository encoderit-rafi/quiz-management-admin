import { CardContent } from "@/components/ui/card";

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

// Static quiz data
const STATIC_QUIZ_DATA = {
  id: 1,
  quiz_name: "Sample Quiz",
  title: "Customer Satisfaction Survey",
  heading: "Help Us Improve",
  cta_text: "Start Quiz",
  footer_text: "Thank you for your feedback",
  description:
    "<p>We value your opinion and would love to hear your thoughts about our products and services.</p>",
  logo: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  background_image:
    "https://images.unsplash.com/photo-1590650589327-3f67c43ad8a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  primary_color: "#3b82f6",
  secondary_color: "#8b5cf6",
  is_active: true,
  questions: [
    {
      name: "How satisfied are you with our service?",
      options: [
        { label: "Very Satisfied", points: 10 },
        { label: "Satisfied", points: 7 },
        { label: "Neutral", points: 5 },
        { label: "Dissatisfied", points: 3 },
        { label: "Very Dissatisfied", points: 0 },
      ],
    },
    {
      name: "Would you recommend us to others?",
      options: [
        { label: "Definitely", points: 10 },
        { label: "Probably", points: 7 },
        { label: "Maybe", points: 5 },
        { label: "Probably Not", points: 3 },
        { label: "Definitely Not", points: 0 },
      ],
    },
    {
      name: "How would you rate the quality of our products?",
      options: [
        { label: "Excellent", points: 10 },
        { label: "Good", points: 7 },
        { label: "Average", points: 5 },
        { label: "Poor", points: 3 },
        { label: "Very Poor", points: 0 },
      ],
    },
  ],
};

export default function CardQuiz({ form_data: _form_data }: TProps) {
  // Commented out API call - using static data instead

  // Use static data
  const quiz = STATIC_QUIZ_DATA;

  if (!quiz) {
    return <CardContent>No quiz data found.</CardContent>;
  }

  return (
    <CardContent className="space-y-6 overflow-y-auto">
      <div className="grid gap-6">
        <section className="space-y-4">
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
