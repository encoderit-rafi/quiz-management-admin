import { BubbleMenu as TiptapBubbleMenu } from "@tiptap/react/menus";
import type { BubbleMenuProps } from "@tiptap/react/menus";
import { useTiptap } from "./context";

type Props = Omit<BubbleMenuProps, "editor"> & {
  className?: string;
  tippyOptions?: any;
};

export const BubbleMenu = ({ children, className, ...props }: Props) => {
  const { editor } = useTiptap();

  if (!editor) {
    return null;
  }

  return (
    <TiptapBubbleMenu editor={editor} className={className} {...props}>
      {children}
    </TiptapBubbleMenu>
  );
};
