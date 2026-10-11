"use client";

import React, { useState } from 'react'
import { SketchPicker, type ColorResult } from 'react-color';
import { Bold, LucideIcon, Italic, UndoIcon, UnderlineIcon, RedoIcon, PrinterIcon, SpellCheck, MessagesSquare, MessageSquarePlusIcon, ListTodoIcon, RemoveFormattingIcon, ChevronDown, HighlighterIcon, Link2Icon, AlignLeftIcon, AlignJustifyIcon, AlignRightIcon, AlignCenterIcon, ImageIcon, UploadIcon, SearchIcon, List, ListOrdered } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { LineHeight } from '@tiptap/extension-text-style';

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

const LineHeightButton = () => {
  const { editor } = useEditorStore();

  const lineHeights = [
    { label: 'Default', value: 'normal' },
    { label: '1.15', value: '1.15' },
    { label: '1.5', value: '1.5' },
    { label: '2.0', value: '2.0' },
    { label: '4.0', value: '4.0' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200 outline-none px-1.5 gap-x-1">
        <ListOrdered size={18} />
        <ChevronDown size={14} className="shrink-0 ml-0.5" />
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="flex flex-col gap-y-1 p-1 min-w-0">
        {lineHeights.map(({ label, value }) => {
          const isActive = value === 'normal' 
            ? false 
            : editor?.isActive('textStyle', { lineHeight: value });

          return (
            <button
              key={value}
              className={cn(
                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 text-sm cursor-pointer",
                isActive && "bg-neutral-200/80"
              )}
              onClick={() => {
                if (value === 'normal') {
                  editor?.chain().focus().unsetLineHeight().run();
                } else {
                  editor?.chain().focus().toggleTextStyle({ lineHeight: value }).run();
                }
              }}
            >
              {label}
            </button>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ListButton = () => {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: 'Bullet List',
      icon: List,
      isActive: editor?.isActive('bulletList'),
      onClick: () => { editor?.chain().focus().toggleBulletList().run() },
    },
    {
      label: 'Ordered List',
      icon: ListOrdered,
      isActive: editor?.isActive('orderedList'),
      onClick: () => { editor?.chain().focus().toggleOrderedList().run() },
    },
    ];
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200 outline-none">
        <ListTodoIcon size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {lists.map(({ label, icon: Icon, onClick, isActive }) => (
          <button
            key={label}
            title={label}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200",
              isActive && "bg-neutral-200/80" 
            )}
            onClick={onClick}>
            <Icon size={18} /><span>{label}</span>
          </button>
        ))} 
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    { label: 'Left', value: 'left', icon: AlignLeftIcon },
    { label: 'Center', value: 'center', icon: AlignCenterIcon },
    { label: 'Right', value: 'right', icon: AlignRightIcon },
    { label: 'Justify', value: 'justify', icon: AlignJustifyIcon },
  ];
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200 outline-none">
        <AlignLeftIcon size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-row gap-x-1">
        {alignments.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            title={label}
            className={cn(
              "h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200",
              editor?.isActive({ textAlign: value }) ? "bg-neutral-200/80" : ""
            )}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
          >
            <Icon size={18} />
            <span className="sr-only">{label}</span>
          </button>
        ))} 
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const FontSizeButton = () => {
  const { editor } = useEditorStore();
  const [fontSize, setFontSize] = useState(editor?.getAttributes('textStyle').fontSize || '16px');

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = event.target.value;
    setFontSize(newSize);
    editor?.chain().focus().setFontSize(newSize).run();
  };
  return (
    <select className="bg-transparent border-none focus:ring-0 w-20" value={fontSize} onChange={handleFontSizeChange}>
      <option value="8px">8</option>
      <option value="10px">10</option>
      <option value="12px">12</option>
      <option value="14px">14</option>
      <option value="16px">16</option>
      <option value="18px">18</option>
      <option value="20px">20</option>
      <option value="24px">24</option>
      <option value="28px">28</option>
      <option value="32px">32</option>
      <option value="36px">36</option>
    </select>
  )
}

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");

  const handleInsertImage = (src: string) => {
    if (src) {
      editor?.chain().focus().setImage({ src }).run();
    }
  };

  const OnUploadImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        handleInsertImage(url);
      }
    };
    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (url) {
      handleInsertImage(url);
      setUrl("");
      setIsOpen(false);
    }
  };

  return (
    <>
    <DropdownMenu onOpenChange={(open) => {
      if (open) {
        setUrl("");
      }
    }}>
      <DropdownMenuTrigger className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200 outline-none">
          <ImageIcon size={18} />
        </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={OnUploadImage}><UploadIcon className="size-4 mr-2" /> Upload Image</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setIsOpen(true)}><SearchIcon className="size-4 mr-2" /> Insert Image from URL</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insert Image URL</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="http://example.com/image.jpg"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleImageUrlSubmit();
            }
          }}
        />
        <DialogFooter>
          <Button onClick={handleImageUrlSubmit} className="mt-2">Insert</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  )

}

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = React.useState("");

  const OnChange = (href: string) => {
    editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
    setValue("");
  };

  return (
    <DropdownMenu onOpenChange={(open) => {
      if (open) {
        setValue(editor?.getAttributes('link').href || "");
      }
    }}>
      <DropdownMenuTrigger className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200 outline-none">
          <Link2Icon size={18} />
        </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 flex gap-x-1 items-center justify-center mt-1 rounded-sm bg-neutral-100/40">
        <Input
          placeholder="http://example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.stopPropagation()}
        />
        <Button onClick={() => OnChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
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

  // 1. Storing the active font in a variable
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
        <FontSizeButton />
        <Separator orientation='vertical' className='h-6 w-0.5 bg-neutral-300 mx-1' />
        {
          sections[1].map((index) => (
            <ToolbarButton key={index.label} { ...index } />
          ))
        }
        <TextColorButton />
        <HighlightButton />
        <Separator orientation='vertical' className='h-6 w-0.5 bg-neutral-300 mx-1' />
        <LinkButton />
        <ImageButton />
        <Separator orientation='vertical' className='h-6 w-0.5 bg-neutral-300 mx-1' />
        <ListButton />
        <AlignButton />
        <LineHeightButton />
        <Separator orientation='vertical' className='h-6 w-0.5 bg-neutral-300 mx-1' />
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
