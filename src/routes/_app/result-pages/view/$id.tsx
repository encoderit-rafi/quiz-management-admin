import { createFileRoute, Link } from "@tanstack/react-router";
// import { useQuery } from "@tanstack/react-query";
// import { useGetResultPage } from "../-apis"; // Fixed import
import type { TResultPageSchema } from "../-types"; // Added type import
import { CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react"; // Removed Loader2, Trash2
import AppButtonText from "@/components/base/app-button-text";
import AppCardHeaderWithBackButton from "@/components/base/app-card-header-with-back-button";

export const Route = createFileRoute("/_app/result-pages/view/$id")({
  component: ViewResultPage,
});

// Static demo data
const DEMO_RESULT_PAGES: TResultPageSchema[] = [
  {
    id: 1,
    name: "Success Page",
    min_score: 80,
    max_score: 100,
    content:
      "<p><strong>Congratulations!</strong> You have successfully passed the quiz with an excellent score.</p><p>Your performance demonstrates a strong understanding of the material. Keep up the great work!</p>",
  },
  {
    id: 2,
    name: "Average Page",
    min_score: 50,
    max_score: 79,
    content:
      "<p><strong>Good job!</strong> You have passed the quiz.</p><p>While your score is good, there's still room for improvement. Consider reviewing the material and practicing more to achieve an even better result next time.</p>",
  },
  {
    id: 3,
    name: "Failure Page",
    min_score: 0,
    max_score: 49,
    content:
      "<p><strong>Thank you for taking the quiz.</strong></p><p>Unfortunately, you did not pass this time. Don't be discouraged! Review the material, practice more, and try again. You can do it!</p>",
  },
];

function ViewResultPage() {
  const { id } = Route.useParams();

  // Commented out API call - using static data instead
  // const { isLoading } = useQuery({
  //   ...useGetResultPage(id),
  //   select: (data: any) => {
  //     if (data) return data as TResultPageSchema;
  //     // Fallback to demo data
  //     return DEMO_RESULT_PAGES.find((p) => String(p.id) === String(id));
  //   },
  // });

  // if (isLoading) {
  //   return (
  //     <div className="flex h-full items-center justify-center">
  //       <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
  //     </div>
  //   );
  // }

  // Use static data
  const resultPage = DEMO_RESULT_PAGES.find((p) => String(p.id) === String(id));

  if (!resultPage) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Result page not found.</p>
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

      <CardContent className="space-y-6">
        <div className="grid gap-6">
          <section className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">
              General Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium">Page Name</div>
                <div className="text-sm text-muted-foreground">
                  {resultPage.name}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Score Range</div>
                <div className="text-sm text-muted-foreground">
                  {resultPage.min_score} - {resultPage.max_score} points
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Content</h3>
            <div
              className="prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: resultPage.content || "" }}
            />
          </section>
        </div>
      </CardContent>
    </>
  );
}
