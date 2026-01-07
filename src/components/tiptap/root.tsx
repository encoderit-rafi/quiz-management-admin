import { useEffect } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HardBreak from "@tiptap/extension-hard-break";
import ResizableImageExtension from "tiptap-extension-resize-image";
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
} from "@tiptap/extension-table";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Link from "@tiptap/extension-link";
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
    extensions: [
      StarterKit,
      HardBreak,
      ResizableImageExtension.configure({
        // inline: true,

        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "flex items-center gap-2",
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          class: "text-primary underline underline-offset-4 cursor-pointer",
        },
      }),
    ],
    content: value || defaultValue,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert max-w-none p-3 focus:outline-none [&_ul[data-type='taskList']]:list-none [&_li[data-type='taskItem']]:flex [&_li[data-type='taskItem']]:items-start [&_li[data-type='taskItem']]:gap-2",
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
