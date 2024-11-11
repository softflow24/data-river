import "reflect-metadata";
import "@data-river/shared/tailwind.css";
import { Provider } from "react-redux";
import { ReactFlowProvider } from "reactflow";
import store from "./store";
import { EditorLayout } from "./components/EditorLayout";
import TopRightControls from "./components/controls/top-right-controls";
import { Toaster } from "@data-river/shared/ui/components/ui/toaster";
import { Toaster as SonnerToaster } from "@data-river/shared/ui/components/ui/sonner";
import { cn } from "@data-river/shared/ui/utils";

interface EditorProps {
  readOnly?: boolean;
}

export function Editor({ readOnly = false }: EditorProps) {
  return (
    <ReactFlowProvider>
      <div
        className={cn(
          "h-full w-full flex flex-col",
          readOnly && "overflow-hidden", // Prevent scrolling in readonly mode
        )}
      >
        {!readOnly && (
          <div className="min-h-12 flex items-center justify-end p-2 border bg-background">
            <TopRightControls />
          </div>
        )}
        <EditorLayout readOnly={readOnly} />
      </div>
    </ReactFlowProvider>
  );
}

function EditorWithRedux(props: EditorProps) {
  return (
    <Provider store={store}>
      <Editor {...props} />
      {!props.readOnly && (
        <>
          <Toaster />
          <SonnerToaster />
        </>
      )}
    </Provider>
  );
}

export default EditorWithRedux;
