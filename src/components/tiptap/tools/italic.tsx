import { useEditorState } from "@tiptap/react";
import { ItalicIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils";

export const Italic = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor?.isActive("italic") ?? false,
      canDo: ctx.editor?.can().chain().focus().toggleItalic().run() ?? false,
    }),
  });

  if (!editor || !state) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          type="button"
          aria-label="Toggle italic"
          size="sm"
          pressed={state.isActive}
          disabled={!state.canDo}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn("cursor-pointer", {
            "bg-muted text-muted-foreground": state.isActive,
          })}
        >
          <ItalicIcon className="size-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>Italic</TooltipContent>
    </Tooltip>
  );
};
