import { Editor, EditorProps, OnMount } from "@monaco-editor/react";
import {
  MemoExoticComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { editor } from "monaco-editor";
import darkTheme from "../themes/dark.json";
import useTheme from "@data-river/shared/ui/hooks/useTheme";

const MonacoEditorWrapper = (props: EditorProps) => {
  const [MonacoEditor, setMonacoEditor] = useState<
    MemoExoticComponent<typeof Editor>
  >(null as unknown as MemoExoticComponent<typeof Editor>);

  const editor = useRef<editor.IStandaloneCodeEditor | null>(null);

  const theme = useTheme();
  useEffect(() => {
    import("@monaco-editor/react").then((module) => {
      setMonacoEditor(
        () => module.default as unknown as MemoExoticComponent<typeof Editor>,
      );
    });
  }, []);

  const handleEditorDidMount: OnMount = useCallback((_editor, monaco) => {
    const customTheme: editor.IStandaloneThemeData = {
      base: "vs-dark",
      inherit: true,
      colors: darkTheme.colors,
      rules: [],
    };

    monaco.editor.defineTheme("customTheme", customTheme);
    editor.current = _editor;
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      editor.current?.updateOptions({ theme: "customTheme" });
    } else {
      editor.current?.updateOptions({ theme: "vs-light" });
    }
  }, [theme, editor.current]);

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
