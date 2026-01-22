import { Node, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    columnBlock: {
      setColumns: (columns: number) => ReturnType;
      unsetColumns: () => ReturnType;
    };
  }
}

export const ColumnBlock = Node.create({
  name: "columnBlock",
  group: "block",
  content: "column+",
  draggable: true,

  addAttributes() {
    return {
      columns: {
        default: 2,
        parseHTML: (element) => element.getAttribute("data-columns") || 2,
        renderHTML: (attributes) => ({
          "data-columns": attributes.columns,
          style: `grid-template-columns: repeat(${attributes.columns}, 1fr); display: grid; gap: 1rem;`,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="columns"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "columns" }),
      0,
    ];
  },

  addCommands() {
    return {
      setColumns:
        (columns: number) =>
        ({ commands }) => {
          const cols = Array.from({ length: columns }, () => ({
            type: "column",
            content: [{ type: "paragraph" }],
          }));

          return commands.insertContent({
            type: this.name,
            attrs: { columns },
            content: cols,
          });
        },
      unsetColumns:
        () =>
        ({ commands }) => {
          return commands.lift(this.name);
        },
    };
  },
});

export const Column = Node.create({
  name: "column",
  content: "block+",

  parseHTML() {
    return [
      {
        tag: 'div[data-type="column"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "column",
        class: "column",
      }),
      0,
    ];
  },
});
