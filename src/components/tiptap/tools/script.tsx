import { useEditorState } from "@tiptap/react";
import { SubscriptIcon, SuperscriptIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTiptap } from "../context";
import { cn } from "@/utils";

export const Script = () => {
  const { editor } = useTiptap();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      sub: ctx.editor?.isActive("subscript"),
      super: ctx.editor?.isActive("superscript"),
    }),
  });

  if (!editor || !state) return null;

  return (
    <div className="flex items-center gap-0.5">
      <Toggle
        size="sm"
        pressed={state.sub}
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={cn("h-8 w-8 p-0 cursor-pointer", {
          "bg-muted text-accent-foreground": state.sub,
        })}
        aria-label="Subscript"
      >
        <SubscriptIcon className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={state.super}
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={cn("h-8 w-8 p-0 cursor-pointer", {
          "bg-muted text-accent-foreground": state.super,
        })}
        aria-label="Superscript"
      >
        <SuperscriptIcon className="size-4" />
      </Toggle>
    </div>
  );
};
