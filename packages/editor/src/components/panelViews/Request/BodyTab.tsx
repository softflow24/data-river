import { useState, useEffect } from "react";
import { Label, RadioGroup, RadioGroupItem } from "@data-river/shared/ui";
import MonacoEditorWrapper from "../../MonacoEditorWrapper";

interface BodyTabProps {
  body: string;
  handleEditorChange: (value: string | undefined) => void;
  jsonError: string | null;
}

export function BodyTab({ body, handleEditorChange, jsonError }: BodyTabProps) {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <Label>Body</Label>
      <RadioGroup defaultValue="none">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="none" id="none" />
          <Label htmlFor="none">None</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="form-data" id="form-data" />
          <Label htmlFor="form-data">Form Data</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="x-www-form-urlencoded"
            id="x-www-form-urlencoded"
          />
          <Label htmlFor="x-www-form-urlencoded">x-www-form-urlencoded</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="json" id="json" />
          <Label htmlFor="json">JSON</Label>
        </div>
      </RadioGroup>

      <div>
        <div className="border rounded-md">
          <MonacoEditorWrapper
            height="150px"
            defaultLanguage="json"
            defaultValue={body}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              folding: false,
              lineNumbers: "off",
              wordWrap: "on",
              wrappingIndent: "deepIndent",
              automaticLayout: true,
              suggest: {
                showProperties: false,
              },
              formatOnPaste: true,
              formatOnType: true,
            }}
          />
        </div>
        {jsonError && <p className="text-red-500 text-sm mt-1">{jsonError}</p>}
      </div>
    </div>
  );
}
