import Editor from "./editor";
import Navbar from "./navbar";
import Toolbar from "./toolbar";

interface EditorIdPageProps {
  params: Promise<{ id: string }>;
}

const EditorIdPage = async ({ params }: EditorIdPageProps) => {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-[#F9FBFD]">
      <Navbar />
      <Toolbar />
      <Editor />
    </main>
  );
};

export default EditorIdPage;