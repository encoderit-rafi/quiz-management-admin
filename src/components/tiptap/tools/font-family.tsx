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

export const FontFamily = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => {
      if (ctx.editor?.isActive("textStyle", { fontFamily: "Inter" }))
        return "Inter";
      if (ctx.editor?.isActive("textStyle", { fontFamily: "Comic Sans MS" }))
        return "Comic Sans MS";
      if (ctx.editor?.isActive("textStyle", { fontFamily: "serif" }))
        return "serif";
      if (ctx.editor?.isActive("textStyle", { fontFamily: "monospace" }))
        return "monospace";
      if (ctx.editor?.isActive("textStyle", { fontFamily: "cursive" }))
        return "cursive";
      return "Inter"; // Default
    },
  });

  if (!editor || !state) return null;

  const handleChange = (value: string) => {
    if (value === "Inter") {
      editor.chain().focus().unsetFontFamily().run();
    } else {
      editor.chain().focus().setFontFamily(value).run();
    }
  };

  return (
    <Select value={state} onValueChange={handleChange}>
      <SelectTrigger
        className={cn("h-8 w-32 bg-transparent border-none shadow-none px-2")}
      >
        <SelectValue placeholder="Font" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Inter" style={{ fontFamily: "Inter" }}>
          Inter
        </SelectItem>
        <SelectItem
          value="Comic Sans MS"
          style={{ fontFamily: "Comic Sans MS" }}
        >
          Comic Sans
        </SelectItem>
        <SelectItem value="serif" style={{ fontFamily: "serif" }}>
          Serif
        </SelectItem>
        <SelectItem value="monospace" style={{ fontFamily: "monospace" }}>
          Monospace
        </SelectItem>
        <SelectItem value="cursive" style={{ fontFamily: "cursive" }}>
          Cursive
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
