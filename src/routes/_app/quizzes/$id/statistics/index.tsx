import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  Eye,
  Play,
  CheckCircle,
  ArrowDownRight,
  Clock,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { useGetStatistics } from "./-apis";
import { StatCard } from "./-components";
import type { TStatisticsSchema } from "./-types";
import { useGetAllQuizzes } from "../../../-apis";
import { useBreadcrumb } from "@/store/use-breadcrumb.store";
import type { TPtah } from "@/types";

export const Route = createFileRoute("/_app/quizzes/$id/statistics/")({
  component: StatisticsPage,
});

const DEMO_QUIZZES = [
  { id: 1, title: "General Knowledge Quiz" },
  { id: 2, title: "Customer Feedback Survey" },
  { id: 3, title: "Product Preference Test" },
];

const DEMO_STATS: TStatisticsSchema = {
  views: 1250,
  starts: 980,
  completions: 750,
  drop_off_rate: 12,
  avg_time: "2m 45s",
  conversion_rate: 76,
};

function StatisticsPage() {
  const { id } = Route.useParams();
  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([
      { name: "View Quiz", path: `/quizzes/${id}/view/` as TPtah },
      {
        name: "Quiz Statistics",
      },
    ]);
  }, []);

  // Fetch statistics for the selected quiz
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    ...useGetStatistics(id),
    select: (data: any) => data || DEMO_STATS,
  });

  return (
    <div className="space-y-6 p-4">
      {!id && !isLoadingStats ? (
        <div className="flex h-[400px] items-center justify-center border rounded-lg bg-muted/10 border-dashed">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <BarChart3 className="h-8 w-8" />
            <p>Select a quiz to view statistics</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Landing Views"
            value={stats?.landing_page_views}
            icon={Eye}
            isLoading={isLoadingStats}
            description="Total visits to the landing page"
          />
          <StatCard
            title="Quiz Starts"
            value={stats?.quiz_starts}
            icon={Play}
            isLoading={isLoadingStats}
            description="Number of times the quiz was started"
          />
          <StatCard
            title="Completions"
            value={stats?.quiz_completions}
            icon={CheckCircle}
            isLoading={isLoadingStats}
            description="Total completed submissions"
          />
          {stats.drop_off_rate && <StatCard
            title="Drop-off Rate"
            value={stats ? `${stats.drop_off_rate}%` : undefined}
            icon={ArrowDownRight}
            isLoading={isLoadingStats}
            description="Percentage of users who abandoned"
          />}
          <StatCard
            title="Avg. Time Spent"
            value={stats?.total_time_spent}
            icon={Clock}
            isLoading={isLoadingStats}
            description="Average duration per completion"
          />
          {stats.conversion_rate && <StatCard
            title="Conversion Rate"
            value={stats ? `${stats.conversion_rate}%` : 0}
            icon={TrendingUp}
            isLoading={isLoadingStats}
            description="Views to completion ratio"
          />}
        </div>
      )}
    </div>
  );
}
