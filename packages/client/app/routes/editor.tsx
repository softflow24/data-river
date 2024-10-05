import Editor from "@data-river/editor";

export default function Page() {
  return (
    <main className="flex flex-1 flex-row transition-all duration-300 ease-in-out h-screen overflow-hidden">
      <div className="h-full w-full rounded-md">
        <Editor />
      </div>
    </main>
  );
}
