"use client";

import React from 'react'
import { Bold, LucideIcon, Italic, UndoIcon, UnderlineIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor';

interface toolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon?: LucideIcon;
}

const ToolbarButton = ({onClick, isActive, icon: Icon}: toolbarButtonProps) => {
  return (
    <button onClick={onClick} className={cn("text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200", isActive && "bg-gray-200/80")}>
        {Icon && <Icon size={18} />}
    </button>
  )
}

const Toolbar = () => {
  const { editor } = useEditorStore();
  console.log("Editor in toolbar:", editor);

    const sections : {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    } [][] = [[
        {
            label: "Bold",
            icon: Bold,
            onClick: () => { editor?.chain().focus().toggleBold().run() },
        },
        {
            label: "Italic",
            icon: Italic,
            onClick: () => { editor ? editor.chain().focus().toggleItalic().run() : "hello" },
        },
        {
            label: "Undo",
            icon: UndoIcon,
            onClick: () => { editor?.chain().focus().undo().run() },
        },
        {
            label: "Underline",
            icon: UnderlineIcon,
            onClick: () => { editor?.chain().focus().toggleUnderline().run() },
        },
    ] ];
  return (
    <div className="flex items-center gap-x-0 gap-2 border-b border-neutral-300 bg-neutral-100 px-2.5 py-0.5 rounded-[24px] min-h-[40px]">
      { sections[0].map((index) => (
        <ToolbarButton key={index.label} { ...index } />
        )) }
    </div>
  )
}

export default Toolbar;
