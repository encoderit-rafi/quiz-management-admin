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

export const TextType = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => {
      if (ctx.editor?.isActive("paragraph")) return "paragraph";
      if (ctx.editor?.isActive("heading", { level: 1 })) return "h1";
      if (ctx.editor?.isActive("heading", { level: 2 })) return "h2";
      if (ctx.editor?.isActive("heading", { level: 3 })) return "h3";
      if (ctx.editor?.isActive("heading", { level: 4 })) return "h4";
      if (ctx.editor?.isActive("heading", { level: 5 })) return "h5";
      if (ctx.editor?.isActive("heading", { level: 6 })) return "h6";
      return "paragraph";
    },
  });

  if (!editor || !state) return null;

  const handleChange = (value: string) => {
    switch (value) {
      case "paragraph":
        editor.chain().focus().setParagraph().run();
        break;
      case "h2":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case "h3":
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case "h4":
        editor.chain().focus().toggleHeading({ level: 4 }).run();
        break;
      case "h5":
        editor.chain().focus().toggleHeading({ level: 5 }).run();
        break;
      case "h6":
        editor.chain().focus().toggleHeading({ level: 6 }).run();
        break;
    }
  };

  return (
    <Select value={state} onValueChange={handleChange}>
      <SelectTrigger
        className={cn(
          "h-8 w-32 bg-transparent border-none shadow-none px-2 cursor-pointer",
        )}
      >
        <SelectValue placeholder="Text Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="paragraph">Paragraph</SelectItem>
        <SelectItem value="h2">Heading 1</SelectItem>
        <SelectItem value="h3">Heading 2</SelectItem>
        <SelectItem value="h4">Heading 3</SelectItem>
        <SelectItem value="h5">Heading 4</SelectItem>
        <SelectItem value="h6">Heading 5</SelectItem>
      </SelectContent>
    </Select>
  );
};
