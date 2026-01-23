import { useEditorState } from "@tiptap/react";
import { MinusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const HorizontalRule = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      canDo:
        ctx.editor?.can().chain().focus().setHorizontalRule().run() ?? false,
    }),
  });

  if (!editor || !state) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          aria-label="Insert horizontal rule"
          size="sm"
          variant="ghost"
          disabled={!state.canDo}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <MinusIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Horizontal Rule</TooltipContent>
    </Tooltip>
  );
};
