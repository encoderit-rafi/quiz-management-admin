import { useEditorState } from "@tiptap/react";
import { Heading3Icon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils";

export const Heading3 = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor?.isActive("heading", { level: 3 }) ?? false,
      canDo:
        ctx.editor?.can().chain().focus().toggleHeading({ level: 3 }).run() ??
        false,
    }),
  });

  if (!editor || !state) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          type="button"
          aria-label="Toggle heading 3"
          size="sm"
          pressed={state.isActive}
          disabled={!state.canDo}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={cn("cursor-pointer", {
            "bg-muted text-muted-foreground": state.isActive,
          })}
        >
          <Heading3Icon className="size-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>Heading 3</TooltipContent>
    </Tooltip>
  );
};
