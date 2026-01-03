import { cn } from "@/utils";
import type { ComponentProps, PropsWithChildren } from "react";

type TProps = PropsWithChildren & ComponentProps<"span">;
export default function AppButtonText({
  children,
  className,
  ...props
}: TProps) {
  return (
    <span className={cn("hidden md:block", className)} {...props}>
      {children}
    </span>
  );
}
