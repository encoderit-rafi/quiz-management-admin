import { useState, useCallback } from "react";
import { MousePointer2Icon } from "lucide-react";
import { useEditorState } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTiptap } from "../context";

export const CTAButton = () => {
  const { editor } = useTiptap();
  const [text, setText] = useState("Click Here");
  const [url, setUrl] = useState("");

  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor?.isActive("ctaButton") ?? false,
    }),
  });

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (open && editor?.isActive("ctaButton")) {
        const attrs = editor.getAttributes("ctaButton");
        setText(attrs.text || "Click Here");
        setUrl(attrs.url || "");
      }
    },
    [editor],
  );

  const insertCTA = useCallback(() => {
    if (!editor || !url) return;
    (editor.chain().focus() as any).setCTAButton({ url, text }).run();
  }, [editor, url, text]);

  if (!editor || !state) return null;

  return (
    <Popover onOpenChange={onOpenChange}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-accent-foreground"
            >
              <MousePointer2Icon />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>CTA Button</TooltipContent>
      </Tooltip>
      <PopoverContent className="w-80 p-3" align="start">
        <div className="flex flex-col gap-3">
          <div className="space-y-1">
            <span className="text-xs font-medium">Button Text</span>
            <Input
              placeholder="Button Text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="h-8"
            />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-medium">Button URL</span>
            <Input
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-8"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  insertCTA();
                }
              }}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              className="h-8"
              onClick={insertCTA}
              disabled={!url}
            >
              {state.isActive ? "Update Button" : "Insert Button"}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
