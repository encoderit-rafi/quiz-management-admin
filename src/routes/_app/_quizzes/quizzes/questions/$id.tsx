import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { FormQuizQuestions } from "../../-components";
import { useGetQuizQuestions, useUpdateQuizQuestions } from "../../-apis";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const DEMO_QUESTIONS = [
  {
    name: "What is the capital of France?",
    options: [
      { label: "London", points: 0 },
      { label: "Berlin", points: 0 },
      { label: "Paris", points: 10 },
      { label: "Madrid", points: 0 },
    ],
  },
  {
    name: "Which planet is known as the Red Planet?",
    options: [
      { label: "Mars", points: 10 },
      { label: "Venus", points: 0 },
      { label: "Jupiter", points: 0 },
      { label: "Saturn", points: 0 },
    ],
  },
  {
    name: "Who wrote 'Romeo and Juliet'?",
    options: [
      { label: "Charles Dickens", points: 0 },
      { label: "William Shakespeare", points: 10 },
      { label: "Jane Austen", points: 0 },
      { label: "Mark Twain", points: 0 },
    ],
  },
];

export const Route = createFileRoute("/_app/_quizzes/quizzes/questions/$id")({
  component: QuizQuestionsPage,
});

function QuizQuestionsPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const { data: questions, isLoading: isFetching } = useQuery(
    useGetQuizQuestions(id)
  );

  const { mutate: updateQuestions, isPending: isUpdating } =
    useUpdateQuizQuestions(id);

  const handleSubmit = (data: any) => {
    updateQuestions(data, {
      onSuccess: () => {
        navigate({ to: "/", search: { page: 1, per_page: 15 } });
      },
    });
  };

  const handleCancel = () => {
    navigate({ to: "/", search: { page: 1, per_page: 15 } });
  };

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <CardHeader className="flex items-start gap-2">
        <Button variant="outline" size="icon" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex flex-col">
          <CardTitle>Quiz Questions</CardTitle>
          <CardDescription>
            Manage questions, options, and points for this quiz.
          </CardDescription>
        </div>
      </CardHeader>

      <div className="flex-1 flex flex-col overflow-hidden">
        {!isFetching && (
          <FormQuizQuestions
            initialData={{
              questions:
                questions && questions.length > 0 ? questions : DEMO_QUESTIONS,
            }}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isUpdating}
          />
        )}
        {isFetching && (
          <div className="flex items-center justify-center p-12">
            <p className="text-muted-foreground">Loading questions...</p>
          </div>
        )}
      </div>
    </div>
  );
}
