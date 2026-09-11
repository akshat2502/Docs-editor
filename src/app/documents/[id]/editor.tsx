"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from '@tiptap/extension-list';
import Image from '@tiptap/extension-image';
import Highlight from '@tiptap/extension-highlight';
import { Dropcursor, Gapcursor } from '@tiptap/extensions'
import { TableKit } from '@tiptap/extension-table'
import { TextStyle, Color } from '@tiptap/extension-text-style'
import { FontFamily } from '@tiptap/extension-font-family'
import { useEditorStore } from "@/store/use-editor";
import { FontSize } from "@/extensions/font-size";

const Editor = () => {
  const { setEditor } = useEditorStore();
  const editor = useEditor({
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
        Highlight.configure({ multicolor: true }),
        FontFamily,
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[1000px]",
      },
    },
    content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
      `,
  });

  return <EditorContent editor={editor} />;
};

export default Editor;