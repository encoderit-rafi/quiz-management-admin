import { useEditorState } from "@tiptap/react";
import { ListIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const BulletList = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor?.isActive("bulletList") ?? false,
      canDo:
        ctx.editor?.can().chain().focus().toggleBulletList().run() ?? false,
    }),
  });

  if (!editor || !state) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          type="button"
          aria-label="Toggle bullet list"
          size="sm"
          pressed={state.isActive}
          disabled={!state.canDo}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="cursor-pointer"
        >
          <ListIcon className="size-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>Bullet List</TooltipContent>
    </Tooltip>
  );
};
