import { createContext, useContext } from "react";
import { Editor } from "@tiptap/react";

type TiptapContextProps = {
  editor: Editor | null;
  isHtmlView: boolean;
  setIsHtmlView: (value: boolean) => void;
};

export const TiptapContext = createContext<TiptapContextProps | null>(null);

export const useTiptap = () => {
  const context = useContext(TiptapContext);
  if (!context) {
    throw new Error("useTiptap must be used within a Tiptap provider");
  }
  return context;
};
