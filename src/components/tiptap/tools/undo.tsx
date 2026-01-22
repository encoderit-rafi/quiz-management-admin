import { useEditorState } from "@tiptap/react";
import { Undo2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Undo = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      canDo: ctx.editor?.can().chain().focus().undo().run() ?? false,
    }),
  });

  if (!editor || !state) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          aria-label="Undo"
          size="sm"
          variant="ghost"
          disabled={!state.canDo}
          onClick={() => editor.chain().focus().undo().run()}
          className="cursor-pointer size-8 p-0"
        >
          <Undo2Icon className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Undo</TooltipContent>
    </Tooltip>
  );
};
