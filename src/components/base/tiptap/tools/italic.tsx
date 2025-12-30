import { useEditorState } from "@tiptap/react";
import { ItalicIcon } from "lucide-react";
import { Toggle } from "../../../ui/toggle";
import { useTiptap } from "../context";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../ui/tooltip";

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
          className="cursor-pointer"
        >
          <ItalicIcon className="size-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>Italic</TooltipContent>
    </Tooltip>
  );
};
