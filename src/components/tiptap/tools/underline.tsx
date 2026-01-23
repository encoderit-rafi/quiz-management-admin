import { useEditorState } from "@tiptap/react";
import { UnderlineIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils";

export const Underline = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor?.isActive("underline") ?? false,
      canDo: ctx.editor?.can().chain().focus().toggleUnderline().run() ?? false,
    }),
  });

  if (!editor || !state) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          type="button"
          aria-label="Toggle underline"
          size="sm"
          pressed={state.isActive}
          disabled={!state.canDo}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn("cursor-pointer", {
            "bg-muted text-accent-foreground": state.isActive,
          })}
        >
          <UnderlineIcon className="size-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>Underline</TooltipContent>
    </Tooltip>
  );
};
