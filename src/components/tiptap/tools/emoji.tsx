import { SmileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTiptap } from "../context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// For now, simpler emoji list. In real app, integrate emoji-picker-react.
const EMOJIS = ["😀", "😂", "🥰", "😎", "🤔", "👍", "👎", "🔥", "🎉", "❤️"];

export const Emoji = () => {
  const { editor } = useTiptap();

  if (!editor) return null;

  const insertEmoji = (emoji: string) => {
    editor.chain().focus().insertContent(emoji).run();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="size-8 p-0 cursor-pointer"
          title="Insert Emoji"
        >
          <SmileIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="start">
        <div className="grid grid-cols-5 gap-1">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              className="text-xl hover:bg-muted p-1 rounded"
              onClick={() => insertEmoji(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
