import Editor from "./editor";
import Toolbar from "./toolbar";

interface EditorIdPageProps {
  params: Promise<{ id: string }>;
}

const EditorIdPage = async ({ params }: EditorIdPageProps) => {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-[#F9FBFD]">
      <Toolbar />
      <Editor />
    </main>
  );
};

export default EditorIdPage;