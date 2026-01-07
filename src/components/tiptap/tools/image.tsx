import { useEditorState } from "@tiptap/react";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Image = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      canDo:
        ctx.editor?.can().chain().focus().setImage({ src: "" }).run() ?? false,
    }),
  });

  if (!editor || !state) return null;

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          aria-label="Insert image"
          size="sm"
          variant="ghost"
          disabled={!state.canDo}
          onClick={addImage}
          className="cursor-pointer size-8 p-0"
        >
          <ImageIcon className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Insert Image</TooltipContent>
    </Tooltip>
  );
};
