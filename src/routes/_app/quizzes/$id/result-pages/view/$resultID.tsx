import { createFileRoute, Link } from "@tanstack/react-router";

import { CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react"; // Removed Loader2, Trash2
import AppButtonText from "@/components/base/app-button-text";

export const Route = createFileRoute(
  "/_app/quizzes/$id/result-pages/view/$resultID"
)({
  component: ViewResultPage,
});

import { useQuery } from "@tanstack/react-query";
import { useGetResultPage } from "../-apis";
import { useBreadcrumb } from "@/store/use-breadcrumb.store";
import { useGetQuiz } from "@/routes/_app/-apis";
import { useEffect } from "react";
import type { TPath } from "@/types";

function ViewResultPage() {
  const { id, resultID } = Route.useParams();
  const { data: quiz } = useQuery(useGetQuiz(id));
  const { setBreadcrumb } = useBreadcrumb();
  const { data: resultPage, isLoading } = useQuery(useGetResultPage(resultID));

  useEffect(() => {
    setBreadcrumb([
      {
        name: quiz?.name || "",
        path: `/quizzes/${id}/view` as TPath,
      },
      {
        name: "Result Pages",
        path: `/quizzes/${id}/result-pages` as TPath,
      },
      {
        name: resultPage?.title || "",
      },
    ]);
  }, [quiz, resultPage]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!resultPage) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Result page not found.</p>
      </div>
    );
  }

  return (
    <>
      <CardHeader className="flex items-center gap-2 justify-end">
        <Button asChild variant={"outline"}>
          <Link
            to="/quizzes/$id/result-pages/edit/$resultID"
            params={{ id, resultID }}
          >
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
                <div className="text-sm font-medium">Page Title</div>
                <div className="text-sm text-muted-foreground">
                  {resultPage.title}
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
