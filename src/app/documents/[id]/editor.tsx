"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { LineHeight } from '@tiptap/extension-text-style/line-height';
import Image from '@tiptap/extension-image';
import Highlight from '@tiptap/extension-highlight';
import { Dropcursor, Gapcursor } from '@tiptap/extensions'
import { TableKit } from '@tiptap/extension-table'
import { TextStyle, Color } from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align';
import { FontFamily } from '@tiptap/extension-font-family'
import { useEditorStore } from "@/store/use-editor";
import { FontSize } from "@/extensions/font-size";
import Ruler from "./ruler";

const Editor = () => {
  const { setEditor } = useEditorStore();
  const editor = useEditor({
    immediatelyRender: false,
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onDestroy: () => {
      setEditor(null);
    },
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onTransaction: ({ editor }) => {
      setEditor(editor);
    },
    onFocus: ({ editor }) => {
      setEditor(editor);
    },
    onBlur: ({ editor }) => {
      setEditor(editor);
    },
    onContentError: ({ editor }) => {
      setEditor(editor);
    },
    extensions: [
        StarterKit,
        FontSize,
        TaskList,
        TaskItem.configure({ nested: true}),
        Image.configure({resize: { enabled: true, alwaysPreserveAspectRatio: true,},}),
        Dropcursor,
        Gapcursor,
        TableKit.configure({
        table: { resizable: true },
      }),
        TextStyle,
        Color,
        LineHeight,
        Highlight.configure({ multicolor: true }),
        FontFamily,
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    editorProps: {
      attributes: {
        class:
        "focus:outline-none w-[816px] min-h-[1054px] bg-white border border-[#C7C7C7] shadow-md px-14 py-10 cursor-text print:border-0 print:shadow-none print:m-0",
      },
    },
  });

  return (
  <div className="size-full overflow-x-auto bg-white/50 px-4 print:px-0 print:bg-white print:overflow-x-visible">
    <div className="flex flex-col items-center w-full mx-auto print:w-full print:min-w-0">
        
        <Ruler />
        <EditorContent editor={editor} />
        
      </div>
  </div>
);
};

export default Editor;