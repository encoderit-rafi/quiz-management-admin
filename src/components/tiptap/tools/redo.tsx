import { useEditorState } from "@tiptap/react";
import { Redo2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Redo = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      canDo: ctx.editor?.can().chain().focus().redo().run() ?? false,
    }),
  });

  if (!editor || !state) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          aria-label="Redo"
          size="sm"
          variant="ghost"
          disabled={!state.canDo}
          onClick={() => editor.chain().focus().redo().run()}
          className="cursor-pointer size-8 p-0"
        >
          <Redo2Icon className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Redo</TooltipContent>
    </Tooltip>
  );
};
