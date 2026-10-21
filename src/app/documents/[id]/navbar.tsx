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
import { File, FileIcon, FileJson, ScrollText, FileCode, FolderPlus, Eraser, Printer, FileXCorner, BoldIcon, ItalicIcon, UnderlineIcon, Table2Icon, Redo2Icon, Undo2Icon, RemoveFormattingIcon} from "lucide-react";

const Navbar = () => {
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
                                    <MenubarItem>
                                        <FileJson className="size-4 mr-2"/>
                                        Json
                                    </MenubarItem>
                                    <MenubarItem>
                                        <FileCode className="size-4 mr-2"/>
                                        Html
                                    </MenubarItem>
                                    <MenubarItem>
                                        <File className="size-4 mr-2"/>
                                        Pdf
                                    </MenubarItem>
                                    <MenubarItem>
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


                            <MenubarItem>
                                <FileXCorner className="size-4 mr-2" />
                                Remove
                            </MenubarItem>

                            <MenubarSeparator />

                            <MenubarItem onClick={()=> window.print()}>
                                <Printer className="size-4 mr-2" />
                                Print <MenubarShortcut className="">⌘P</MenubarShortcut>
                            </MenubarItem>

                        </MenubarContent>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger>
                            Edit
                        </MenubarTrigger>
                        <MenubarContent className="print:hidden">
                            <MenubarItem>
                                <Undo2Icon className="size-4 mr-2"/>
                                Undo
                            </MenubarItem>
                            <MenubarItem>
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
                                    <MenubarItem>
                                        1x1
                                    </MenubarItem>
                                    <MenubarItem>
                                        2x2
                                    </MenubarItem>
                                    <MenubarItem>
                                        3x3
                                    </MenubarItem>
                                    <MenubarItem>
                                        4x4
                                    </MenubarItem>
                                    <MenubarItem>
                                        5x5
                                    </MenubarItem>
                                    <MenubarItem>
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
                                    <MenubarItem>
                                        <BoldIcon className="size-4 mr-2"/>
                                        Bold
                                    </MenubarItem>
                                    <MenubarItem>
                                        <ItalicIcon className="size-4 mr-2"/>
                                        Italic
                                    </MenubarItem>
                                    <MenubarItem>
                                        <UnderlineIcon className="size-4 mr-2"/>
                                        Underline
                                    </MenubarItem>
                                </MenubarSubContent>
                            </MenubarSub>
                                    <MenubarItem>
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