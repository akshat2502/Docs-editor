"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from '@tiptap/extension-list';
import Image from '@tiptap/extension-image';
import { Dropcursor, Gapcursor } from '@tiptap/extensions'
import { TableKit } from '@tiptap/extension-table'
import { useEditorStore } from "@/store/use-editor";

const Editor = () => {
  const { setEditor } = useEditorStore();
  const editor = useEditor({
    onCreate: ({ editor }) => {
      console.log("Editor created:", editor);
      setEditor(editor);
    },
    extensions: [
        StarterKit,
        TaskList,
        TaskItem.configure({ nested: true}),
        Image.configure({resize: { enabled: true, alwaysPreserveAspectRatio: true,},}),
        Dropcursor,
        Gapcursor,
        TableKit.configure({
        table: { resizable: true },
      }),
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