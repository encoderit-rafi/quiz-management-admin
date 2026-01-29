import { EditorContent } from "@tiptap/react";
import { useTiptap } from "./context";
import { cn } from "@/utils";
import { Textarea } from "@/components/ui/textarea";

interface EditorProps {
  className?: string;
}

export const Editor = ({ className }: EditorProps) => {
  const { editor, isHtmlView } = useTiptap();

  if (!editor) return null;

  if (isHtmlView) {
    return (
      <Textarea
        value={editor.getHTML()}
        onChange={(e) => editor.commands.setContent(e.target.value)}
        className={cn(
          "min-h-[200px] w-full font-mono text-sm p-4 border-none focus-visible:ring-0 rounded-none bg-transparent",
          className,
        )}
      />
    );
  }

  return <EditorContent editor={editor} className={cn("h-full", className)} />;
};
