import { RemoveFormattingIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTiptap } from "../context";

export const ClearFormatting = () => {
  const { editor } = useTiptap();

  if (!editor) return null;

  const clear = () => {
    editor.chain().focus().unsetAllMarks().clearNodes().run();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="size-8 p-0 cursor-pointer"
      onClick={clear}
      title="Clear Formatting"
    >
      <RemoveFormattingIcon className="size-4" />
    </Button>
  );
};
