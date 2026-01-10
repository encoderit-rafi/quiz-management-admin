import { useEditorState } from "@tiptap/react";
import { PaletteIcon } from "lucide-react"; // Or Baseline, Type
import { useTiptap } from "../context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export const Color = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) =>
      ctx.editor?.getAttributes("textStyle").color || "#000000",
  });

  if (!editor) return null;

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editor.chain().focus().setColor(e.target.value).run();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          title="Text Color"
        >
          <PaletteIcon className="size-4" style={{ color: state }} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Text Color</span>
          <input
            type="color"
            value={state}
            onChange={handleColorChange}
            className="w-full h-8 cursor-pointer"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().unsetColor().run()}
          >
            Reset
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
