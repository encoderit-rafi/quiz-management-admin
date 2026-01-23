import { useEditorState } from "@tiptap/react";
import { ListOrderedIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils";

export const OrderedList = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor?.isActive("orderedList") ?? false,
      canDo:
        ctx.editor?.can().chain().focus().toggleOrderedList().run() ?? false,
    }),
  });

  if (!editor || !state) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          type="button"
          aria-label="Toggle ordered list"
          size="sm"
          pressed={state.isActive}
          disabled={!state.canDo}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn("cursor-pointer", {
            "bg-muted text-accent-foreground": state.isActive,
          })}
        >
          <ListOrderedIcon className="size-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>Ordered List</TooltipContent>
    </Tooltip>
  );
};
