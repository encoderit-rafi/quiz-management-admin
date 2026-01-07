import { useEditorState } from "@tiptap/react";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRef } from "react";

export const Image = () => {
  const { editor } = useTiptap();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      canDo:
        ctx.editor?.can().chain().focus().setImage({ src: "" }).run() ?? false,
    }),
  });

  if (!editor || !state) return null;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        if (src) {
          editor.chain().focus().setImage({ src }).run();
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const addImage = () => {
    // Directly open file picker
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            aria-label="Insert image"
            size="sm"
            variant="ghost"
            disabled={!state.canDo}
            onClick={addImage}
            className="cursor-pointer size-8 p-0"
          >
            <ImageIcon className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Insert Image</TooltipContent>
      </Tooltip>
    </>
  );
};
