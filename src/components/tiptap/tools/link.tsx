import { useState, useCallback } from "react";
import { LinkIcon, UnlinkIcon } from "lucide-react";
import { useEditorState } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTiptap } from "../context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/utils";

export const Link = () => {
  const { editor } = useTiptap();
  const [url, setUrl] = useState("");

  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor?.isActive("link") ?? false,
      currentUrl: ctx.editor?.getAttributes("link").href ?? "",
      canDo:
        ctx.editor?.can().chain().focus().setLink({ href: "" }).run() ?? false,
    }),
  });

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (open && state?.currentUrl) {
        setUrl(state.currentUrl);
      } else if (!open) {
        setUrl("");
      }
    },
    [state?.currentUrl]
  );

  const setLink = useCallback(() => {
    if (!editor) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank" })
        .run();
    }
  }, [editor, url]);

  if (!editor || !state) return null;
  if (state.isActive) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            type="button"
            aria-label="Toggle link"
            size="sm"
            pressed={state.isActive}
            disabled={!state.canDo}
            onClick={() =>
              editor.chain().focus().extendMarkRange("link").unsetLink().run()
            }
            className={cn(
              "cursor-pointer text-muted-foreground hover:text-destructive",
              {
                "bg-muted": state.isActive,
              }
            )}
          >
            <UnlinkIcon className="size-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Remove Link</TooltipContent>
      </Tooltip>
    );
  }
  return (
    <Popover onOpenChange={onOpenChange}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant={state.isActive ? "secondary" : "ghost"}
              size="sm"
              className="size-8 p-0 cursor-pointer"
              disabled={!state.canDo && !state.isActive}
            >
              <LinkIcon className="size-4" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>
          {state.isActive ? "Edit Link" : "Insert Link"}
        </TooltipContent>
      </Tooltip>
      <PopoverContent className="w-80 p-3" align="start">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Input
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-8"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setLink();
                }
              }}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button size="sm" className="h-8" onClick={setLink}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
