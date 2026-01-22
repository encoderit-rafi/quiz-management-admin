import { Node, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    ctaButton: {
      setCTAButton: (attrs: { url: string; text: string }) => ReturnType;
    };
  }
}

export const CTAButton = Node.create({
  name: "ctaButton",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      url: {
        default: "",
      },
      text: {
        default: "Click Here",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'a[data-type="cta-button"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { class: "cta-button-container" },
      [
        "a",
        mergeAttributes(HTMLAttributes, {
          "data-type": "cta-button",
          class: "cta-button",
          href: HTMLAttributes.url,
          target: "_blank",
          rel: "noopener noreferrer nofollow",
        }),
        HTMLAttributes.text,
      ],
    ];
  },

  addCommands() {
    return {
      setCTAButton:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs,
          });
        },
    };
  },
});
