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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

// import { useGetAllQuizzes } from "../_quizzes/-apis";
import { useGetStatistics } from "./-apis";
import { StatCard } from "./-components";
import type { TStatisticsSchema } from "./-types";
import { useGetAllQuizzes } from "../../../-apis";
import AppBackButton from "@/components/base/app-back-button";

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
  const [selectedQuizId, setSelectedQuizId] = useState<string>("");

  // Fetch all quizzes for the dropdown
  const { data: quizzes, isLoading: isLoadingQuizzes } = useQuery({
    ...useGetAllQuizzes(),
    select: (data: any) =>
      Array.isArray(data) && data.length > 0 ? data : DEMO_QUIZZES,
  });

  // Set default selection when quizzes load
  useEffect(() => {
    if (quizzes?.length && !selectedQuizId) {
      setSelectedQuizId(String(quizzes[0].id));
    }
  }, [quizzes, selectedQuizId]);

  // Fetch statistics for selected quiz
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    ...useGetStatistics(selectedQuizId),
    select: (data: any) => data || DEMO_STATS,
  });

  const handleQuizChange = (value: string) => {
    setSelectedQuizId(value);
  };

  return (
    <div className="space-y-6 p-4">
      {!selectedQuizId && !isLoadingQuizzes ? (
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
            value={stats?.views}
            icon={Eye}
            isLoading={isLoadingStats}
            description="Total visits to the landing page"
          />
          <StatCard
            title="Quiz Starts"
            value={stats?.starts}
            icon={Play}
            isLoading={isLoadingStats}
            description="Number of times the quiz was started"
          />
          <StatCard
            title="Completions"
            value={stats?.completions}
            icon={CheckCircle}
            isLoading={isLoadingStats}
            description="Total completed submissions"
          />
          <StatCard
            title="Drop-off Rate"
            value={stats ? `${stats.drop_off_rate}%` : undefined}
            icon={ArrowDownRight}
            isLoading={isLoadingStats}
            description="Percentage of users who abandoned"
          />
          <StatCard
            title="Avg. Time Spent"
            value={stats?.avg_time}
            icon={Clock}
            isLoading={isLoadingStats}
            description="Average duration per completion"
          />
          <StatCard
            title="Conversion Rate"
            value={stats ? `${stats.conversion_rate}%` : undefined}
            icon={TrendingUp}
            isLoading={isLoadingStats}
            description="Views to completion ratio"
          />
        </div>
      )}
    </div>
  );
}
