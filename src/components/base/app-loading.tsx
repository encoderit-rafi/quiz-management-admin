import { Loader2 } from "lucide-react";

interface AppLoadingProps {
  message?: string;
  className?: string;
}

export default function AppLoading({
  message = "Loading...",
  className = "",
}: AppLoadingProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[400px] w-full gap-4 ${className}`}
    >
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="text-muted-foreground animate-pulse font-medium">
        {message}
      </p>
    </div>
  );
}
