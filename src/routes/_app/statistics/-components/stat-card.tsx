import { cn } from "@/utils/cn";
import { Loader2, type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number | undefined;
  icon: LucideIcon;
  description?: string;
  className?: string;
  isLoading?: boolean;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  className,
  isLoading,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow p-6",
        className
      )}
    >
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <span className="text-sm font-medium leading-none tracking-tight">
          {title}
        </span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        {isLoading ? (
          <div className="flex items-center gap-2 mt-2">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold">{value ?? "-"}</div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
