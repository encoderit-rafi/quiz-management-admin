import { useEditorState } from "@tiptap/react";
import { CodeXmlIcon } from "lucide-react";
import { Toggle } from "../../../ui/toggle";
import { useTiptap } from "../context";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../ui/tooltip";

export const CodeBlock = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor?.isActive("codeBlock") ?? false,
      canDo: ctx.editor?.can().chain().focus().toggleCodeBlock().run() ?? false,
    }),
  });

  if (!editor || !state) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          type="button"
          aria-label="Toggle code block"
          size="sm"
          pressed={state.isActive}
          disabled={!state.canDo}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className="cursor-pointer"
        >
          <CodeXmlIcon className="size-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>Code Block</TooltipContent>
    </Tooltip>
  );
};
