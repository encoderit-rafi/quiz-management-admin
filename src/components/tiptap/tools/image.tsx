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
import { useUploadImage } from "@/api/use-upload-image";
import { Loader2 } from "lucide-react";

export const Image = () => {
  const { editor } = useTiptap();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadImage = useUploadImage();

  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      canDo:
        ctx.editor?.can().chain().focus().setImage({ src: "" }).run() ?? false,
    }),
  });

  if (!editor || !state) return null;

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const res = await uploadImage.mutateAsync(file);
        const url = res?.url || res?.data?.url || res; // Flexible check for URL
        if (url && typeof url === "string") {
          editor.chain().focus().setImage({ src: url }).run();
        } else {
          console.error("No URL found in upload response:", res);
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
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
            disabled={!state.canDo || uploadImage.isPending}
            onClick={addImage}
            className="text-muted-foreground hover:text-accent-foreground"
          >
            {uploadImage.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <ImageIcon />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Insert Image</TooltipContent>
      </Tooltip>
    </>
  );
};
