import { cn } from "@/utils";

interface ToolbarProps {
  children: React.ReactNode;
  className?: string;
}

export const Toolbar = ({ children, className }: ToolbarProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-1 border-b p-1 bg-muted/50",
        className
      )}
    >
      {children}
    </div>
  );
};
