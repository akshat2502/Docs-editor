"use client";

import Image from "next/image";
import Link from "next/link";
import { DocumentInput } from "./document-input";

import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { File, FileIcon, FileJson, ScrollText, FileCode, FolderPlus, Eraser, Printer, FileXCorner, BoldIcon, ItalicIcon, UnderlineIcon, Table2Icon, Redo2Icon, Undo2Icon, RemoveFormattingIcon, EarthIcon} from "lucide-react";
import { useEditorStore } from "@/store/use-editor";

const Navbar = () => {

    const { editor } = useEditorStore();

    const onDownload = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
    }

    const saveHTML = ()=>{
        const content = editor?.getHTML() || "";
        const blob = new Blob([content], {
            type: "text/html"
        });
        onDownload(blob, `document.html`)
    }
    
    const saveJson = ()=>{
        const content = editor?.getJSON();
        const blob = new Blob([JSON.stringify(content)], {
            type: "application/json"
        })
        onDownload(blob, `document.json`)
    }

    const saveText = ()=>{
        const content = editor?.getText() || "";
        const blob = new Blob([(content)], {
            type: "text/plain"
        })
        onDownload(blob, `document.txt`)
    }

    const InsertTable = ({rows, cols}: {rows: number, cols: number}) => { const table = editor?.chain().focus().insertTable({rows, cols, withHeaderRow: false}).run(); }

  return (
    <nav className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
            <Link href='/'>
            <Image src='/logo.svg' alt="logo" width={36} height={36}/>
            </Link>
            <div className="flex flex-col">
                <DocumentInput />
                <div className="flex">
                <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                    <MenubarMenu>
                        <MenubarTrigger>
                            File
                        </MenubarTrigger>
                        <MenubarContent className="print:hidden">
                            <MenubarSub>
                                <MenubarSubTrigger>
                                        <FileIcon className="size-4 mr-2"/>
                                        Save
                                </MenubarSubTrigger>
                                <MenubarSubContent>
                                    <MenubarItem onClick={saveJson}>
                                        <FileJson className="size-4 mr-2"/>
                                        Json
                                    </MenubarItem>
                                    <MenubarItem onClick={saveHTML}>
                                        <EarthIcon className="size-4 mr-2"/>
                                        Html
                                    </MenubarItem>
                                    <MenubarItem onClick={()=> window.print()}>
                                        <File className="size-4 mr-2"/>
                                        Pdf
                                    </MenubarItem>
                                    <MenubarItem onClick={saveText}>
                                        <ScrollText className="size-4 mr-2"/>
                                        Text
                                    </MenubarItem>
                                </MenubarSubContent>
                            </MenubarSub>
                            <MenubarItem>
                                <FolderPlus className="size-4 mr-2" />
                                New document
                            </MenubarItem>

                            <MenubarSeparator />

                            <MenubarItem>
                                <Eraser className="size-4 mr-2" />
                                Rename
                            </MenubarItem>


                            <MenubarItem onClick={()=> editor?.chain().focus().clearContent().run()}>
                                <FileXCorner className="size-4 mr-2" />
                                Remove
                            </MenubarItem>

                            <MenubarSeparator />

                            <MenubarItem onClick={()=> window.print()}>
                                <Printer className="size-4 mr-2" />
                                Print <MenubarShortcut>ctrl+P</MenubarShortcut>
                            </MenubarItem>

                        </MenubarContent>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger>
                            Edit
                        </MenubarTrigger>
                        <MenubarContent className="print:hidden">
                            <MenubarItem onClick={()=> editor?.chain().focus().undo().run()}>
                                <Undo2Icon className="size-4 mr-2"/>
                                Undo
                            </MenubarItem>
                            <MenubarItem onClick={()=> editor?.chain().focus().redo().run()}>
                                <Redo2Icon className="size-4 mr-2"/>
                                Redo
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger>
                            Insert
                        </MenubarTrigger>
                        <MenubarContent className="print:hidden">
                            <MenubarSub>
                                <MenubarSubTrigger>
                                        <Table2Icon className="size-4 mr-2"/>
                                        Table
                                </MenubarSubTrigger>
                                <MenubarSubContent>
                                    <MenubarItem onClick={()=> InsertTable({rows:1, cols:1})}>
                                        1x1
                                    </MenubarItem>
                                    <MenubarItem onClick={()=> InsertTable({rows:2, cols:2})}>
                                        2x2
                                    </MenubarItem>
                                    <MenubarItem onClick={()=> InsertTable({rows:3, cols:3})}>
                                        3x3
                                    </MenubarItem>
                                    <MenubarItem onClick={()=> InsertTable({rows:4, cols:4})}>
                                        4x4
                                    </MenubarItem>
                                    <MenubarItem onClick={()=> InsertTable({rows:5, cols:5})}>
                                        5x5
                                    </MenubarItem>
                                    <MenubarItem onClick={()=> InsertTable({rows:6, cols:6})}>
                                        6x6
                                    </MenubarItem>
                                </MenubarSubContent>
                            </MenubarSub>
                        </MenubarContent>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger>
                            Format
                        </MenubarTrigger>
                        <MenubarContent className="print:hidden">
                            <MenubarSub>
                                <MenubarSubTrigger>
                                    <MenubarItem>
                                        <ScrollText className="size-4 mr-2"/>
                                        Text
                                    </MenubarItem>
                                </MenubarSubTrigger>
                                <MenubarSubContent>
                                    <MenubarItem onClick={()=> editor?.chain().focus().toggleBold().run()}>
                                        <BoldIcon className="size-4 mr-2"/>
                                        Bold
                                    </MenubarItem>
                                    <MenubarItem onClick={()=> editor?.chain().focus().toggleItalic().run()}>
                                        <ItalicIcon className="size-4 mr-2"/>
                                        Italic
                                    </MenubarItem>
                                    <MenubarItem onClick={()=> editor?.chain().focus().toggleUnderline().run()}>
                                        <UnderlineIcon className="size-4 mr-2"/>
                                        Underline
                                    </MenubarItem>
                                </MenubarSubContent>
                            </MenubarSub>
                                    <MenubarItem onClick={()=> editor?.chain().focus().unsetAllMarks().run()}>
                                        <RemoveFormattingIcon className="size-4 mr-2"/>
                                        Clear Formatting
                                    </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>

                </Menubar>
                </div>
            </div>
        </div>
    </nav>
  );
}

export default Navbar;