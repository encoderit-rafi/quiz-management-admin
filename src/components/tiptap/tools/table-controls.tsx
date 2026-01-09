import { useEditorState } from "@tiptap/react";
import { TableRowsSplit, TableColumnsSplit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const TableControls = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isInTable: ctx.editor?.isActive("table") ?? false,
      canAddRowBefore: ctx.editor?.can().addRowBefore() ?? false,
      canAddRowAfter: ctx.editor?.can().addRowAfter() ?? false,
      canAddColumnBefore: ctx.editor?.can().addColumnBefore() ?? false,
      canAddColumnAfter: ctx.editor?.can().addColumnAfter() ?? false,
      canDeleteRow: ctx.editor?.can().deleteRow() ?? false,
      canDeleteColumn: ctx.editor?.can().deleteColumn() ?? false,
      canDeleteTable: ctx.editor?.can().deleteTable() ?? false,
    }),
  });

  if (!editor || !state || !state.isInTable) return null;

  return (
    <>
      {/* Add Row Before */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            aria-label="Add row before"
            size="sm"
            variant="ghost"
            disabled={!state.canAddRowBefore}
            onClick={() => editor.chain().focus().addRowBefore().run()}
            className="cursor-pointer size-8 p-0"
          >
            <TableRowsSplit className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Add Row Before</TooltipContent>
      </Tooltip>

      {/* Add Row After */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            aria-label="Add row after"
            size="sm"
            variant="ghost"
            disabled={!state.canAddRowAfter}
            onClick={() => editor.chain().focus().addRowAfter().run()}
            className="cursor-pointer size-8 p-0"
          >
            <TableRowsSplit className="size-4 rotate-180" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Add Row After</TooltipContent>
      </Tooltip>

      {/* Add Column Before */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            aria-label="Add column before"
            size="sm"
            variant="ghost"
            disabled={!state.canAddColumnBefore}
            onClick={() => editor.chain().focus().addColumnBefore().run()}
            className="cursor-pointer size-8 p-0"
          >
            <TableColumnsSplit className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Add Column Before</TooltipContent>
      </Tooltip>

      {/* Add Column After */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            aria-label="Add column after"
            size="sm"
            variant="ghost"
            disabled={!state.canAddColumnAfter}
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            className="cursor-pointer size-8 p-0"
          >
            <TableColumnsSplit className="size-4 rotate-180" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Add Column After</TooltipContent>
      </Tooltip>

      {/* Delete Row */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            aria-label="Delete row"
            size="sm"
            variant="destructive"
            disabled={!state.canDeleteRow}
            onClick={() => editor.chain().focus().deleteRow().run()}
            className="cursor-pointer size-8 p-0"
          >
            <Trash2 className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Delete Row</TooltipContent>
      </Tooltip>

      {/* Delete Column */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            aria-label="Delete column"
            size="sm"
            variant="destructive"
            disabled={!state.canDeleteColumn}
            onClick={() => editor.chain().focus().deleteColumn().run()}
            className="cursor-pointer size-8 p-0"
          >
            <Trash2 className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Delete Column</TooltipContent>
      </Tooltip>

      {/* Delete Table */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            aria-label="Delete table"
            size="sm"
            variant="destructive"
            disabled={!state.canDeleteTable}
            onClick={() => editor.chain().focus().deleteTable().run()}
            className="cursor-pointer size-8 p-0"
          >
            <Trash2 className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Delete Table</TooltipContent>
      </Tooltip>
    </>
  );
};
