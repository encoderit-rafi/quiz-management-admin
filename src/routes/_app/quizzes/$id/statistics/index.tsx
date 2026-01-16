import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
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

export const Route = createFileRoute("/_app/quizzes/$id/statistics/")({
  component: StatisticsPage,
});

function StatisticsPage() {
  const { id } = Route.useParams();

  // Fetch statistics for the selected quiz
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    ...useGetStatistics(id),
    select: (data: any) => data || [],
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
          {stats?.drop_off_rate && (
            <StatCard
              title="Drop-off Rate"
              value={stats ? `${stats.drop_off_rate}%` : undefined}
              icon={ArrowDownRight}
              isLoading={isLoadingStats}
              description="Percentage of users who abandoned"
            />
          )}
          <StatCard
            title="Avg. Time Spent"
            value={stats?.average_time_spent_formatted}
            icon={Clock}
            isLoading={isLoadingStats}
            description="Average duration per completion"
          />
          {stats?.conversion_rate && (
            <StatCard
              title="Conversion Rate"
              value={stats ? `${stats.conversion_rate}%` : 0}
              icon={TrendingUp}
              isLoading={isLoadingStats}
              description="Views to completion ratio"
            />
          )}
        </div>
      )}
    </div>
  );
}
