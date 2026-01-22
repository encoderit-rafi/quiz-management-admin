import { Link } from "@tanstack/react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DEFAULT_PAGINATION } from "@/consts";
import { AudioWaveform } from "lucide-react";
import { useActiveQuiz } from "@/store";

export default function AppBreadcrumb() {
  const { activeQuiz } = useActiveQuiz();
  const { quiz } = activeQuiz;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              to="/"
              search={DEFAULT_PAGINATION}
              className="flex items-center gap-2"
            >
              <AudioWaveform />
              Quiz Management
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {quiz?.id && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/quizzes/${quiz.id}/view`}>
                {quiz.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
