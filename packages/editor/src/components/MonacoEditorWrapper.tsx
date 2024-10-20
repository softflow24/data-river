import { Editor, EditorProps, OnMount } from "@monaco-editor/react";
import { MemoExoticComponent, useCallback, useEffect, useState } from "react";
import { editor } from "monaco-editor";
import darkTheme from "../themes/dark.json";
import useTheme from "@data-river/shared/ui/hooks/useTheme";
import { Skeleton } from "@data-river/shared/ui";

const EditorSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
};

const MonacoEditorWrapper = (props: EditorProps) => {
  const [MonacoEditor, setMonacoEditor] = useState<
    MemoExoticComponent<typeof Editor>
  >(null as unknown as MemoExoticComponent<typeof Editor>);

  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor | null>(
    null,
  );

  const theme = useTheme();
  useEffect(() => {
    import("@monaco-editor/react").then((module) => {
      setMonacoEditor(
        () => module.default as unknown as MemoExoticComponent<typeof Editor>,
      );
    });
  }, []);

  const handleEditorDidMount: OnMount = useCallback(
    (_editor, monaco) => {
      const customTheme: editor.IStandaloneThemeData = {
        base: "vs-dark",
        inherit: true,
        colors: darkTheme.colors,
        rules: [],
      };

      monaco.editor.defineTheme("customTheme", customTheme);
      theme.theme === "dark"
        ? monaco.editor.setTheme("customTheme")
        : monaco.editor.setTheme("vs-light");
      setEditor(_editor);
    },
    [theme, setEditor],
  );

  useEffect(() => {
    editor?.updateOptions({
      theme: theme.theme === "dark" ? "customTheme" : "vs-light",
    });
  }, [theme, editor]);

  if (!MonacoEditor) return <EditorSkeleton />;

  return (
    <MonacoEditor
      {...props}
      options={{ ...props.options }}
      onMount={handleEditorDidMount}
      loading={<EditorSkeleton />}
    />
  );
};

export default MonacoEditorWrapper;
