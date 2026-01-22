import { useEditorState } from "@tiptap/react";
import { CornerDownLeft } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const HardBreak = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      canDo: ctx.editor?.can().chain().focus().setHardBreak().run() ?? false,
    }),
  });

  if (!editor || !state) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          type="button"
          aria-label="Insert hard break"
          size="sm"
          disabled={!state.canDo}
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="cursor-pointer"
        >
          <CornerDownLeft className="size-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>Hard Break (Shift + Enter)</TooltipContent>
    </Tooltip>
  );
};
