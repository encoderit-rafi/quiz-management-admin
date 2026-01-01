import { cn } from "@/utils";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
type TProps = {
  props?: {
    div?: React.ComponentProps<"div">;
    input?: React.ComponentProps<typeof Input>;
    button?: React.ComponentProps<"button">;
  };
};
export default function AppSearch({ props }: TProps) {
  return (
    <div
      {...props?.div}
      className={cn("flex rounded-md shadow-xs", props?.div?.className)}
    >
      <Input
        placeholder="Search..."
        {...props?.input}
        className={cn(
          "-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10",
          props?.input?.className
        )}
      />
      <button
        aria-label="Search"
        {...props?.button}
        className={cn(
          "inline-flex w-9 items-center justify-center rounded-e-md border border-input bg-background text-sm text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:bg-accent hover:text-accent-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          props?.button?.className
        )}
      >
        <Search size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
