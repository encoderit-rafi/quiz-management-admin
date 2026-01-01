import { useEditorState } from "@tiptap/react";
import { CodeIcon } from "lucide-react";
import { Toggle } from "../../../ui/toggle";
import { useTiptap } from "../context";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../ui/tooltip";

export const Code = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor?.isActive("code") ?? false,
      canDo: ctx.editor?.can().chain().focus().toggleCode().run() ?? false,
    }),
  });

  if (!editor || !state) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          type="button"
          aria-label="Toggle code"
          size="sm"
          pressed={state.isActive}
          disabled={!state.canDo}
          onClick={() => editor.chain().focus().toggleCode().run()}
          className="cursor-pointer"
        >
          <CodeIcon className="size-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>Code</TooltipContent>
    </Tooltip>
  );
};
