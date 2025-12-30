import { cn } from "@/utils";
import { type ComponentProps, type PropsWithChildren } from "react";
type TProps = ComponentProps<"h1"> & PropsWithChildren;
export default function AppTitle({ children, className, ...props }: TProps) {
  return (
    <h1 {...props} className={cn("text-lg font-medium", className)}>
      {children}
    </h1>
  );
}
