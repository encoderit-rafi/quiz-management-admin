import { YoutubeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTiptap } from "../context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Video = () => {
  const { editor } = useTiptap();
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const addVideo = () => {
    if (url) {
      editor?.chain().focus().setYoutubeVideo({ src: url }).run();
      setUrl("");
      setIsOpen(false);
    }
  };

  if (!editor) return null;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          title="Insert Video"
        >
          <YoutubeIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-3">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Insert YouTube Video</span>
          <Input
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addVideo();
              }
            }}
          />
          <Button size="sm" onClick={addVideo}>
            Insert
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
