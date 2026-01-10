import { useEffect } from "react";
import { useEditor, textblockTypeInputRule } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
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
import Underline from "@tiptap/extension-underline";
import HighlightExtension from "@tiptap/extension-highlight";
import { BubbleMenu as BubbleMenuExtension } from "@tiptap/extension-bubble-menu";
import FontFamily from "@tiptap/extension-font-family";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Youtube from "@tiptap/extension-youtube";
import FontSize from "tiptap-extension-font-size";
import Blockquote from "@tiptap/extension-blockquote";
import Typography from "@tiptap/extension-typography";
import { Column, ColumnBlock } from "./extensions/columns";
import { CTAButton } from "./extensions/cta-button";
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
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }).extend({
        addInputRules() {
          return this.options.levels.map((level: number) => {
            return textblockTypeInputRule({
              find: new RegExp(`^(#{1,${level}})\\s$`),
              type: this.type,
              getAttributes: {
                level: level === 1 ? 2 : level + 1 <= 6 ? level + 1 : 6,
              },
            });
          });
        },
      }),
      HardBreak,
      ResizableImageExtension.configure({
        inline: true,
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
      Column,
      ColumnBlock,
      CTAButton,
      Underline,
      HighlightExtension.configure({ multicolor: true }),
      BubbleMenuExtension.configure({
        pluginKey: "bubbleMenu",
      }),
      FontFamily,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Subscript,
      Superscript,
      Youtube.configure({
        controls: false,
      }),
      // FontSize,
      Blockquote,
      Typography,
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
