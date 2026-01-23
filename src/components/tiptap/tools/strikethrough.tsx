import { useEditorState } from "@tiptap/react";
import { StrikethroughIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils";

export const Strikethrough = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor?.isActive("strike") ?? false,
      canDo: ctx.editor?.can().chain().focus().toggleStrike().run() ?? false,
    }),
  });

  if (!editor || !state) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          type="button"
          aria-label="Toggle strikethrough"
          size="sm"
          pressed={state.isActive}
          disabled={!state.canDo}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn("cursor-pointer", {
            "bg-muted text-accent-foreground": state.isActive,
          })}
        >
          <StrikethroughIcon className="size-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>Strikethrough</TooltipContent>
    </Tooltip>
  );
};
