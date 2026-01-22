import { useEditorState } from "@tiptap/react";
import { useTiptap } from "../context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils";

export const FontSize = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => {
      // This depends on the extension used. Assuming tiptap-extension-font-size uses "fontSize" attribute on textStyle or similar.
      // Or "fontSize" mark.
      return ctx.editor?.getAttributes("textStyle").fontSize || "Default";
    },
  });

  if (!editor) return null;

  const handleChange = (value: string) => {
    if (value === "Default") {
      editor.chain().focus().unsetFontSize().run();
    } else {
      editor.chain().focus().setFontSize(value).run();
    }
  };

  return (
    <Select value={state} onValueChange={handleChange}>
      <SelectTrigger
        className={cn("h-8 w-20 bg-transparent border-none shadow-none px-2")}
      >
        <SelectValue placeholder="Size" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Default">Default</SelectItem>
        <SelectItem value="12px">12px</SelectItem>
        <SelectItem value="14px">14px</SelectItem>
        <SelectItem value="16px">16px</SelectItem>
        <SelectItem value="18px">18px</SelectItem>
        <SelectItem value="20px">20px</SelectItem>
        <SelectItem value="24px">24px</SelectItem>
        <SelectItem value="30px">30px</SelectItem>
      </SelectContent>
    </Select>
  );
};
