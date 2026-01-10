import { useEditorState } from "@tiptap/react";
import { HighlighterIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils";

export const Highlight = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor?.isActive("highlight") ?? false,
      canDo: ctx.editor?.can().chain().focus().toggleHighlight().run() ?? false,
    }),
  });

  if (!editor || !state) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          type="button"
          aria-label="Toggle highlight"
          size="sm"
          pressed={state.isActive}
          disabled={!state.canDo}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={cn("cursor-pointer", {
            "bg-muted text-muted-foreground": state.isActive,
          })}
        >
          <HighlighterIcon className="size-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>Highlight</TooltipContent>
    </Tooltip>
  );
};
