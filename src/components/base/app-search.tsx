import { cn } from "@/utils";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
type TProps = {
  props?: {
    div?: React.ComponentProps<"div">;
    input?: React.ComponentProps<typeof Input>;
    button?: React.ComponentProps<"button">;
  };
  onSearch?: () => void;
};
export default function AppSearch({ props, onSearch }: TProps) {
  return (
    <div
      {...props?.div}
      className={cn("flex w-full max-w-sm", props?.div?.className)}
    >
      <Input
        placeholder="Search..."
        {...props?.input}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch?.();
          }
          props?.input?.onKeyDown?.(e);
        }}
        className={cn(
          "-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10",
          props?.input?.className
        )}
      />
      <button
        aria-label="Search"
        {...props?.button}
        onClick={onSearch}
        className={cn(
          "inline-flex cursor-pointer w-9 items-center justify-center rounded-e-md border border-input  text-sm text-muted-foreground/80 transition-[color,box-shadow] outline-none bg-accent hover:text-accent-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          props?.button?.className
        )}
      >
        <Search size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
