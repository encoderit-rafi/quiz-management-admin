import { useEditorState } from "@tiptap/react";
import {
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTiptap } from "../context";
import { cn } from "@/utils";

export const TextAlign = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      left: ctx.editor?.isActive({ textAlign: "left" }),
      center: ctx.editor?.isActive({ textAlign: "center" }),
      right: ctx.editor?.isActive({ textAlign: "right" }),
      justify: ctx.editor?.isActive({ textAlign: "justify" }),
    }),
  });

  if (!editor || !state) return null;

  return (
    <div className="flex items-center gap-0.5 ">
      <Toggle
        size="sm"
        pressed={state.left}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={cn("h-7 w-7 p-0 cursor-pointer", {
          "bg-muted text-accent-foreground": state.left,
        })}
        aria-label="Align left"
      >
        <AlignLeftIcon className="size-3.5" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={state.center}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={cn("h-7 w-7 p-0 cursor-pointer", {
          "bg-muted text-accent-foreground": state.center,
        })}
        aria-label="Align center"
      >
        <AlignCenterIcon className="size-3.5" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={state.right}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={cn("h-7 w-7 p-0 cursor-pointer", {
          "bg-muted text-accent-foreground": state.right,
        })}
        aria-label="Align right"
      >
        <AlignRightIcon className="size-3.5" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={state.justify}
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={cn("h-7 w-7 p-0 cursor-pointer", {
          "bg-muted text-accent-foreground": state.justify,
        })}
        aria-label="Align justify"
      >
        <AlignJustifyIcon className="size-3.5" />
      </Toggle>
    </div>
  );
};
