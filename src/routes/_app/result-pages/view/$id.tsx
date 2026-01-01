import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useGetResultPage } from "../-apis"; // Fixed import
import type { TResultPageSchema } from "../-types"; // Added type import
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Pencil } from "lucide-react"; // Removed Trash2
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_app/result-pages/view/$id")({
  component: ViewResultPage,
});

// Demo data for fallback
const DEMO_RESULT_PAGES: TResultPageSchema[] = [
  {
    id: 1,
    name: "Success Page",
    min_score: 80,
    max_score: 100,
    content: "<p>Congratulations! You passed!</p>",
  },
  {
    id: 2,
    name: "Average Page",
    min_score: 50,
    max_score: 79,
    content: "<p>Good job, but keep practicing.</p>",
  },
  {
    id: 3,
    name: "Failure Page",
    min_score: 0,
    max_score: 49,
    content: "<p>Please try again.</p>",
  },
];

function ViewResultPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const { data: resultPage, isLoading } = useQuery({
    ...useGetResultPage(id),
    select: (data: any) => {
      if (data) return data as TResultPageSchema;
      // Fallback to demo data
      return DEMO_RESULT_PAGES.find((p) => String(p.id) === String(id));
    },
  });

  const handleBack = () => {
    navigate({ to: "/result-pages" });
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!resultPage) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Result page not found.</p>
        <Button variant="outline" onClick={handleBack}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      <CardHeader className="flex items-start gap-2">
        <Button variant="outline" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <CardTitle>{resultPage.name}</CardTitle>
            <Badge variant="secondary" className="font-mono text-sm">
              {resultPage.min_score}% - {resultPage.max_score}%
            </Badge>
          </div>
          <CardDescription>
            Preview of the content shown to users in this score range.
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            navigate({
              to: "/result-pages/edit/$id",
              params: { id: String(id) },
            })
          }
        >
          <Pencil className="mr-2 h-4 w-4" /> Edit
        </Button>
      </CardHeader>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <Card className="h-full overflow-hidden flex flex-col">
          <CardContent className="flex-1 overflow-y-auto pt-6">
            <div
              className="prose prose-stone dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html:
                  resultPage.content ||
                  "<p class='text-muted-foreground italic'>No content defined.</p>",
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
