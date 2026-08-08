"use client";

import React from 'react'
import { SketchPicker, type ColorResult } from 'react-color';
import { Bold, LucideIcon, Italic, UndoIcon, UnderlineIcon, RedoIcon, PrinterIcon, SpellCheck, MessagesSquare, MessageSquarePlusIcon, ListTodoIcon, RemoveFormattingIcon, ChevronDown, HighlighterIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

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

const HighlightButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes('highlight').color || '#ffffff';

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200 outline-none">
          <HighlighterIcon size={18} />
          <div className="h-0.5 w-full" style={{ backgroundColor: value }}></div>
        </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <SketchPicker
          color={value}
          onChange={onChange}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const TextColorButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes('textStyle').color || '#000000';

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200 outline-none">
          <span className="text-sm">A</span>
          <div className="h-0.5 w-full" style={{ backgroundColor: value }}></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <SketchPicker
          color={value}
          onChange={onChange}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    { label: 'Normal Text', value: 0, fontSize: '16px' },
    { label: 'Heading 1', value: 1, fontSize: '32px' },
    { label: 'Heading 2', value: 2, fontSize: '26px' },
    { label: 'Heading 3', value: 3, fontSize: '20px' },
    { label: 'Heading 4', value: 4, fontSize: '16px' },
    { label: 'Heading 5', value: 5, fontSize: '12px' },
  ];

  // 1. Store the active heading in a variable
  const getCurrentHeading = () => {
    for(const heading of headings) {
      if(editor?.isActive('heading', { level: heading.value })) {
        return heading.label;
      }
    }
    return "Normal Text"; // Default to Normal Text if no heading is active
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-7 min-w-7 p-2 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200 outline-none">
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDown size={16} className="shrink-0 ml-2 size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
        {headings.map((heading) => (
          <button
            key={heading.value}
            style={{ fontSize: heading.fontSize }}
            className="flex items-center gap-x-2 px-2 py-1/3 rounded-sm hover:bg-gray-200/80"
            onClick={() => {
              if (heading.value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor?.chain().focus().toggleHeading({ level: heading.value as any }).run();
              }
              }}
          >
            {heading.label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Courier New', label: 'Courier New' },
    { value: 'Verdana', label: 'Verdana' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Palatino', label: 'Palatino' },
    { value: 'Garamond', label: 'Garamond' },
  ]

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFont = event.target.value;
    editor?.chain().focus().setFontFamily(selectedFont).run();
  }

  // 1. Store the active font in a variable
  const currentFont = editor?.getAttributes('textStyle').fontFamily || 'Arial';

  return (
    <select className="bg-transparent border-none focus:ring-0 w-24" 
    value={currentFont} 
    onChange={handleFontChange} 
    style={{fontFamily: currentFont}}>
      {fonts.map((font) => (
        <option 
        key={font.value}  
        value={font.value}
        style={{fontFamily: font.value}}>
          {font.label}
        </option>
      ))}
    </select>
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
            label: "Undo",
            icon: UndoIcon,
            isActive: editor?.isActive('historyUndo') ,
            onClick: () => { editor?.chain().focus().undo().run() },
        },
        {
            label: "Redo",
            icon: RedoIcon,
            isActive: editor?.isActive('historyRedo'),
            onClick: () => { editor?.chain().focus().redo().run() },
        },
        {
            label: "Print",
            icon: PrinterIcon,
            onClick: () => { window.print() },
        },
        {
            label: "Spellcheck",
            icon: SpellCheck,
            isActive: editor?.isActive('spellcheck'),
            onClick: () => { editor?.view.dom.getAttribute('spellcheck') === 'true' ? editor?.view.dom.setAttribute('spellcheck', 'false') : editor?.view.dom.setAttribute('spellcheck', 'true') },
        },
    ], [
      {
            label: "Bold",
            icon: Bold,
            isActive: editor?.isActive('bold'),
            onClick: () => { editor?.chain().focus().toggleBold().run() },
          },
        {
            label: "Italic",
            icon: Italic,
            isActive: editor?.isActive('italic'),
            onClick: () => { editor ? editor.chain().focus().toggleItalic().run() : "hello" },
        },
        {
            label: "Underline",
            icon: UnderlineIcon,
            isActive: editor?.isActive('underline'),
            onClick: () => { editor?.chain().focus().toggleUnderline().run() },
        },
      ], [
        {
            label: "Comments",
            icon: MessageSquarePlusIcon,
            isActive: false,
            onClick: () => { console.log("Comments clicked") },
        },
        {
            label: "List Todo",
            icon: ListTodoIcon,
            isActive: editor?.isActive('taskList'),
            onClick: () => { editor?.chain().focus().toggleTaskList().run() },
        },
        {
            label: "Remove Formatting",
            icon: RemoveFormattingIcon,
            onClick: () => { editor?.chain().focus().unsetAllMarks().run() },
        },    
    ]];
  return (
    <div className="flex items-center gap-x-0.5 gap-2 border-b border-neutral-300 bg-neutral-100 px-2.5 py-0.5 rounded-[24px] min-h-[40px]">
      { sections[0].map((index) => (
        <ToolbarButton key={index.label} { ...index } />
        )) }

        <Separator orientation="vertical" className='h-6 w-0.5 bg-neutral-300 mx-1' />
        <FontFamilyButton/>

        <Separator orientation='vertical' className='h-6 w-0.5 bg-neutral-300 mx-1' />
        <HeadingLevelButton />
        <Separator orientation='vertical' className='h-6 w-0.5 bg-neutral-300 mx-1' />
        {
          // Font size
        }
        <Separator orientation='vertical' className='h-6 w-0.5 bg-neutral-300 mx-1' />
        {
          sections[1].map((index) => (
            <ToolbarButton key={index.label} { ...index } />
          ))
        }
        <TextColorButton />
        <HighlightButton />
        <Separator orientation='vertical' className='h-6 w-0.5 bg-neutral-300 mx-1' />
        {
          // Link
        }
        {
          // Image
        }
        {
          // align
        }
        {
          // line height
        }
        {
          // list
          sections[2].map((index) => (
            <ToolbarButton key={index.label} { ...index } />
          ))
        }
        
        
    </div>
  )
}

export default Toolbar;
