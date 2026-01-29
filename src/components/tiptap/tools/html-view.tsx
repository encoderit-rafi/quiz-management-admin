// import { FileCodeCorner } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils";
import { FileCode } from "lucide-react";

export const HtmlView = () => {
  const { editor, isHtmlView, setIsHtmlView } = useTiptap();

  if (!editor) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          type="button"
          aria-label="Toggle HTML view"
          size="sm"
          pressed={isHtmlView}
          onClick={() => setIsHtmlView(!isHtmlView)}
          className={cn("cursor-pointer", {
            "bg-muted text-accent-foreground": isHtmlView,
          })}
        >
          {/* <FileCodeCorner className="size-4" /> */}
          <FileCode className="size-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>HTML View</TooltipContent>
    </Tooltip>
  );
};
