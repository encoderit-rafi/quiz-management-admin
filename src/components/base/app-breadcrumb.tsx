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
import { useTranslation } from "react-i18next";

export default function AppBreadcrumb() {
  const { t } = useTranslation();
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
              {t("common.appTitle")}
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
