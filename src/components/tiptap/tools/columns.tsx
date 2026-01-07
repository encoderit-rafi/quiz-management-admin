import {
  ColumnsIcon,
  Grid2x2Icon,
  Grid3x3Icon,
  Trash2Icon,
} from "lucide-react";
import { useEditorState } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Columns = () => {
  const { editor } = useTiptap();

  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor?.isActive("columnBlock") ?? false,
    }),
  });

  if (!editor || !state) return null;

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant={state.isActive ? "secondary" : "ghost"}
              size="sm"
              className="size-8 p-0 cursor-pointer"
            >
              <ColumnsIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Columns</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={() => (editor.chain().focus() as any).setColumns(2).run()}
          className="cursor-pointer"
        >
          <Grid2x2Icon className="mr-2 size-4" />
          <span>2 Columns</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => (editor.chain().focus() as any).setColumns(3).run()}
          className="cursor-pointer"
        >
          <Grid3x3Icon className="mr-2 size-4" />
          <span>3 Columns</span>
        </DropdownMenuItem>
        {state.isActive && (
          <DropdownMenuItem
            onClick={() => (editor.chain().focus() as any).unsetColumns().run()}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <Trash2Icon className="mr-2 size-4" />
            <span>Remove Columns</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
