import { cn } from "@/utils";
import { type ComponentProps, type PropsWithChildren } from "react";
type TProps = ComponentProps<"h2"> & PropsWithChildren;
export default function AppSubTitle({ children, className, ...props }: TProps) {
  return (
    <h2 {...props} className={cn("text-center font-light text-sm", className)}>
      {children}
    </h2>
  );
}
