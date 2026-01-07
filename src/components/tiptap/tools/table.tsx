import { useEditorState } from "@tiptap/react";
import { TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Table = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      canDo:
        ctx.editor
          ?.can()
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run() ?? false,
    }),
  });

  if (!editor || !state) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          aria-label="Insert table"
          size="sm"
          variant="ghost"
          disabled={!state.canDo}
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          className="cursor-pointer size-8 p-0"
        >
          <TableIcon className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Insert Table</TooltipContent>
    </Tooltip>
  );
};
