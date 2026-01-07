import { useEditorState } from "@tiptap/react";
import {
  TableIcon,
  TableRowsSplit,
  TableColumnsSplit,
  Trash2,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTiptap } from "../context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
      canInsert:
        ctx.editor
          ?.can()
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run() ?? false,
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

  if (!editor || !state) return null;

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              aria-label="Table options"
              size="sm"
              variant="ghost"
              className="cursor-pointer size-8 p-0"
            >
              <TableIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Table Options</TooltipContent>
      </Tooltip>

      <DropdownMenuContent align="start" className="w-48">
        {/* Insert Table */}
        <DropdownMenuItem
          disabled={!state.canInsert}
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          <Plus className="size-4 mr-2" />
          Insert Table
        </DropdownMenuItem>

        {state.isInTable && (
          <>
            <DropdownMenuSeparator />

            {/* Row Operations */}
            <DropdownMenuItem
              disabled={!state.canAddRowBefore}
              onClick={() => editor.chain().focus().addRowBefore().run()}
            >
              <TableRowsSplit className="size-4 mr-2" />
              Add Row Before
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={!state.canAddRowAfter}
              onClick={() => editor.chain().focus().addRowAfter().run()}
            >
              <TableRowsSplit className="size-4 mr-2 rotate-180" />
              Add Row After
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={!state.canDeleteRow}
              onClick={() => editor.chain().focus().deleteRow().run()}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="size-4 mr-2" />
              Delete Row
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Column Operations */}
            <DropdownMenuItem
              disabled={!state.canAddColumnBefore}
              onClick={() => editor.chain().focus().addColumnBefore().run()}
            >
              <TableColumnsSplit className="size-4 mr-2" />
              Add Column Before
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={!state.canAddColumnAfter}
              onClick={() => editor.chain().focus().addColumnAfter().run()}
            >
              <TableColumnsSplit className="size-4 mr-2 rotate-180" />
              Add Column After
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={!state.canDeleteColumn}
              onClick={() => editor.chain().focus().deleteColumn().run()}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="size-4 mr-2 rotate-90" />
              Delete Column
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Delete Table */}
            <DropdownMenuItem
              disabled={!state.canDeleteTable}
              onClick={() => editor.chain().focus().deleteTable().run()}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="size-4 mr-2" />
              Delete Table
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
