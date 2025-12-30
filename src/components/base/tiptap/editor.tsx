import { EditorContent } from "@tiptap/react";
import { useTiptap } from "./context";
import { cn } from "@/utils";

interface EditorProps {
  className?: string;
}

export const Editor = ({ className }: EditorProps) => {
  const { editor } = useTiptap();

  return <EditorContent editor={editor} className={cn("h-full", className)} />;
};
