import { useState } from "react";
import { Button, useToast } from "@data-river/shared/ui";
import MonacoEditorWrapper from "../MonacoEditorWrapper";

interface CodeSetupProps {
  nodeId: string;
  config: { code: string };
  onConfigChange: (config: { code: string }) => void;
}

const CodeSetup: React.FC<CodeSetupProps> = ({
  nodeId,
  config,
  onConfigChange,
}) => {
  const [code, setCode] = useState(config.code || "");
  const { toast } = useToast();

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  const handleSubmit = () => {
    onConfigChange({ code });
    toast({
      title: "Code configuration saved",
      description: "Your code configuration has been saved",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-w-[26rem]">
      <div className="bg-background shadow-sm rounded-lg p-4 mb-4">
        <div className="space-y-4">
          <div className="border rounded-md">
            <MonacoEditorWrapper
              height="300px"
              defaultLanguage="javascript"
              value={code}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                folding: true,
                lineNumbers: "on",
                wordWrap: "on",
                wrappingIndent: "deepIndent",
                automaticLayout: true,
                suggest: {
                  showProperties: true,
                },
                formatOnPaste: true,
                formatOnType: true,
              }}
            />
          </div>
          <Button onClick={handleSubmit} className="mt-4">
            Save Code Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodeSetup;
