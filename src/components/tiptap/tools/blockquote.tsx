import { useEditorState } from "@tiptap/react";
import { QuoteIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTiptap } from "../context";
import { cn } from "@/utils";

export const Blockquote = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ctx.editor?.isActive("blockquote"),
  });

  if (!editor) return null;

  return (
    <Toggle
      size="sm"
      pressed={!!state}
      onClick={() => editor.chain().focus().toggleBlockquote().run()}
      className={cn("h-8 w-8 p-0 cursor-pointer", {
        "bg-muted text-accent-foreground": state,
      })}
      aria-label="Blockquote"
    >
      <QuoteIcon className="size-4" />
    </Toggle>
  );
};
