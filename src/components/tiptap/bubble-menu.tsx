import { BubbleMenu as TiptapBubbleMenu } from "@tiptap/react/menus";
import type { BubbleMenuProps } from "@tiptap/react/menus";
import { useTiptap } from "./context";

type Props = Omit<BubbleMenuProps, "editor">;

export const BubbleMenu = ({ children, ...props }: Props) => {
  const { editor } = useTiptap();

  if (!editor) {
    return null;
  }

  return (
    <TiptapBubbleMenu editor={editor} {...props}>
      {children}
    </TiptapBubbleMenu>
  );
};
