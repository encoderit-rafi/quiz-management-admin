import { useEffect } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HardBreak from "@tiptap/extension-hard-break";
import { TiptapContext } from "./context";
import { cn } from "@/utils";

interface TiptapProps {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const Tiptap = ({
  children,
  defaultValue = "",
  value,
  onChange,
  className,
}: TiptapProps) => {
  const editor = useEditor({
    extensions: [StarterKit, HardBreak],
    content: value || defaultValue,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert max-w-none p-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <TiptapContext.Provider value={{ editor }}>
      <div
        className={cn(
          "border rounded-md transition-[color,box-shadow] outline-none focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
          className
        )}
      >
        {children}
      </div>
    </TiptapContext.Provider>
  );
};
