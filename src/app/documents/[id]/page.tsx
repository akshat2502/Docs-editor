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
      <div className="flex flex-col px-4 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#F9FBFD] print:hidden">
      <Navbar />
      <Toolbar />
      </div>
      <div className="pt-[114px] print:pt-0">
      <Editor />
      </div>
    </main>
  );
};

export default EditorIdPage;