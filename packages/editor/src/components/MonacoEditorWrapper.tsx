import { Editor, EditorProps, OnMount } from "@monaco-editor/react";
import { MemoExoticComponent, useCallback, useEffect, useState } from "react";
import { editor } from "monaco-editor";
import darkTheme from "../themes/dark.json";

const MonacoEditorWrapper = (props: EditorProps) => {
  const [MonacoEditor, setMonacoEditor] = useState<
    MemoExoticComponent<typeof Editor>
  >(null as unknown as MemoExoticComponent<typeof Editor>);

  useEffect(() => {
    import("@monaco-editor/react").then((module) => {
      setMonacoEditor(
        () => module.default as unknown as MemoExoticComponent<typeof Editor>,
      );
    });
  }, []);

  const handleEditorDidMount: OnMount = useCallback((editor, monaco) => {
    const customTheme: editor.IStandaloneThemeData = {
      base: "vs-dark",
      inherit: true,
      colors: darkTheme.colors,
      rules: [],
    };

    monaco.editor.defineTheme("customTheme", customTheme);
    monaco.editor.setTheme("customTheme");
    editor.updateOptions({ theme: "customTheme" });
  }, []);

  if (!MonacoEditor) return <div>Loading Editor...</div>;

  return (
    <MonacoEditor
      {...props}
      options={{ ...props.options }}
      onMount={handleEditorDidMount}
    />
  );
};

export default MonacoEditorWrapper;
