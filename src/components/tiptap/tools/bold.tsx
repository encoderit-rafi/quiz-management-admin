import { useEditorState } from "@tiptap/react";
import { BoldIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Bold = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor?.isActive("bold") ?? false,
      canDo: ctx.editor?.can().chain().focus().toggleBold().run() ?? false,
    }),
  });

  if (!editor || !state) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          type="button"
          aria-label="Toggle bold"
          size="sm"
          pressed={state.isActive}
          disabled={!state.canDo}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="cursor-pointer"
        >
          <BoldIcon className="size-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>Bold</TooltipContent>
    </Tooltip>
  );
};
