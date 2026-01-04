import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useGetResultPage } from "../-apis"; // Fixed import
import type { TResultPageSchema } from "../-types"; // Added type import
import { CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Loader2 } from "lucide-react"; // Removed Trash2
import AppButtonText from "@/components/base/app-button-text";
import AppCardHeaderWithBackButton from "@/components/base/app-card-header-with-back-button";

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

  const { isLoading } = useQuery({
    ...useGetResultPage(id),
    select: (data: any) => {
      if (data) return data as TResultPageSchema;
      // Fallback to demo data
      return DEMO_RESULT_PAGES.find((p) => String(p.id) === String(id));
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <>
      <CardHeader className="flex items-center gap-2">
        <AppCardHeaderWithBackButton
          title="Result Page Details"
          description="View result page information and details"
        />
        <Button asChild>
          <Link to="/result-pages/edit/$id" params={{ id }}>
            <Edit />
            <AppButtonText>Edit Result Page</AppButtonText>
          </Link>
        </Button>
      </CardHeader>
    </>
  );
}
