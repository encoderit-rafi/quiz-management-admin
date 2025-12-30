import { useEditorState } from "@tiptap/react";
import { QuoteIcon } from "lucide-react";
import { Toggle } from "../../../ui/toggle";
import { useTiptap } from "../context";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../ui/tooltip";

export const Blockquote = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor?.isActive("blockquote") ?? false,
      canDo:
        ctx.editor?.can().chain().focus().toggleBlockquote().run() ?? false,
    }),
  });

  if (!editor || !state) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          type="button"
          aria-label="Toggle blockquote"
          size="sm"
          pressed={state.isActive}
          disabled={!state.canDo}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="cursor-pointer"
        >
          <QuoteIcon className="size-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>Blockquote</TooltipContent>
    </Tooltip>
  );
};
