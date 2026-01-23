import { useEditorState } from "@tiptap/react";
import { Heading1Icon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils";

export const Heading1 = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
      canDo:
        ctx.editor?.can().chain().focus().toggleHeading({ level: 1 }).run() ??
        false,
    }),
  });

  if (!editor || !state) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          type="button"
          aria-label="Toggle heading 1"
          size="sm"
          pressed={state.isActive}
          disabled={!state.canDo}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={cn("cursor-pointer", {
            "bg-muted text-accent-foreground": state.isActive,
          })}
        >
          <Heading1Icon className="size-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>Heading 1</TooltipContent>
    </Tooltip>
  );
};
