import React from 'react' 
import Editor from './editor';
import Toolbar from './toolbar';

interface editorIdpageProps {
 params: Promise<{ id: string }>
}

const editorIdpage = async ({params} : editorIdpageProps) => {
  const { id } = await params;
  return (
    <main className="min-h-screen bg-neutral-200 pt-3">
      <Toolbar />
      <div className="mx-auto w-[850px]">
        <div className="bg-white min-h-[1120px] shadow-xl rounded-sm px-20 py-16">
          <Editor />
        </div>
      </div>
    </main>
  )
}

export default editorIdpage
