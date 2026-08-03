import React from 'react'
import Link from "next/link";

const editorPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Editor Page</h1>
      <p>And to create a new document, click <Link href="/documents/id"><span className="text-blue-500 underline">here</span></Link></p>
    </div>
  )
}

export default editorPage;


