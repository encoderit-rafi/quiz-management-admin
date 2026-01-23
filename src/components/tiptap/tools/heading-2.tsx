import { useEditorState } from "@tiptap/react";
import { Heading2Icon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils";

export const Heading2 = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
      canDo:
        ctx.editor?.can().chain().focus().toggleHeading({ level: 2 }).run() ??
        false,
    }),
  });

  if (!editor || !state) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          type="button"
          aria-label="Toggle heading 2"
          size="sm"
          pressed={state.isActive}
          disabled={!state.canDo}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={cn("cursor-pointer", {
            "bg-muted text-accent-foreground": state.isActive,
          })}
        >
          <Heading2Icon className="size-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>Heading 2</TooltipContent>
    </Tooltip>
  );
};
