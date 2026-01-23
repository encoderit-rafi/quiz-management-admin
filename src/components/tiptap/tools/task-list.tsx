import { useEditorState } from "@tiptap/react";
import { ListTodoIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils";

export const TaskList = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor?.isActive("taskList") ?? false,
      canDo: ctx.editor?.can().chain().focus().toggleTaskList().run() ?? false,
    }),
  });

  if (!editor || !state) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          type="button"
          aria-label="Toggle task list"
          size="sm"
          pressed={state.isActive}
          disabled={!state.canDo}
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={cn("cursor-pointer", {
            "bg-muted text-accent-foreground": state.isActive,
          })}
        >
          <ListTodoIcon className="size-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>Task List</TooltipContent>
    </Tooltip>
  );
};
