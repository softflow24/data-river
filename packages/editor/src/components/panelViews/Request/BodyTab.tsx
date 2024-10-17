import { useState, useEffect, useCallback } from "react";
import { Label, RadioGroup, RadioGroupItem } from "@data-river/shared/ui";
import MonacoEditorWrapper from "../../MonacoEditorWrapper";
import { KeyValueTable, KeyValuePair } from "./QueryParamsTable";
import _ from "lodash";

export type RequestBodyType =
  | "none"
  | "json"
  | "form-data"
  | "x-www-form-urlencoded";

interface BodyTabProps {
  body: string;
  bodyType: RequestBodyType;
  handleBodyChange: (value: string | undefined) => void;
  handleBodyTypeChange: (value: RequestBodyType) => void;
  validationError: string | null;
}

export function BodyTab({
  body,
  bodyType,
  handleBodyChange,
  handleBodyTypeChange,
  validationError,
}: BodyTabProps) {
  const [jsonBody, setJsonBody] = useState(
    body && bodyType === "json" ? body : "{}",
  );
  const [formData, setFormData] = useState<KeyValuePair[]>([]);
  const [urlEncodedData, setUrlEncodedData] = useState<KeyValuePair[]>([]);

  useEffect(() => {
    if (bodyType === "json" && body !== jsonBody) {
      setJsonBody(body || "{}");
    } else if (
      bodyType === "form-data" ||
      bodyType === "x-www-form-urlencoded"
    ) {
      const parsedData = parseBodyToFormData(body);
      if (bodyType === "form-data") {
        setFormData(parsedData);
      } else {
        setUrlEncodedData(parsedData);
      }
    }
  }, [body, bodyType]);

  const updateBody = useCallback(
    (newBodyType: RequestBodyType, newBody: string) => {
      handleBodyTypeChange(newBodyType);
      handleBodyChange(newBody);
    },
    [handleBodyTypeChange, handleBodyChange],
  );

  const parseBodyToFormData = (bodyString: string): KeyValuePair[] => {
    if (!bodyString || bodyString === "{}" || bodyString === "[]") return [];
    try {
      if (
        bodyString.trim().startsWith("{") ||
        bodyString.trim().startsWith("[")
      ) {
        // It's likely JSON, don't parse it as form data
        return [];
      }
      const pairs = bodyString.split("&");
      return pairs.map((pair) => {
        const [key, value] = pair.split("=");
        return {
          id: _.uniqueId("form-data-"),
          key: decodeURIComponent(key),
          value: decodeURIComponent(value || ""),
        };
      });
    } catch (error) {
      console.error("Error parsing body to form data:", error);
      return [];
    }
  };

  const formDataToString = (data: KeyValuePair[]): string => {
    return data
      .filter((item) => item.key.trim() !== "") // Only include items with non-empty keys
      .map(
        (item) =>
          `${encodeURIComponent(item.key)}=${encodeURIComponent(item.value)}`,
      )
      .join("&");
  };

  const handleFormDataChange = (
    newFormData: KeyValuePair[],
    type: "form-data" | "x-www-form-urlencoded",
  ) => {
    if (type === "form-data") {
      setFormData(newFormData);
    } else {
      setUrlEncodedData(newFormData);
    }
    const newBodyString = formDataToString(newFormData);
    updateBody(type, newBodyString);
  };

  const handleJsonChange = (value: string | undefined) => {
    setJsonBody(value || "{}");
    updateBody("json", value || "{}");
  };

  const handleBodyTypeChangeInternal = (newBodyType: RequestBodyType) => {
    let newBody = "";
    switch (newBodyType) {
      case "json":
        newBody = jsonBody;
        break;
      case "form-data":
        newBody = formDataToString(formData);
        break;
      case "x-www-form-urlencoded":
        newBody = formDataToString(urlEncodedData);
        break;
      case "none":
        newBody = "";
        break;
    }
    updateBody(newBodyType, newBody);
  };

  const renderBodyContent = () => {
    switch (bodyType) {
      case "none":
        return (
          <div className="flex justify-center items-center h-32 border rounded-md">
            <p className="text-muted-foreground">
              This request does not have a body
            </p>
          </div>
        );
      case "json":
        return (
          <div className="border rounded-md">
            <MonacoEditorWrapper
              height="150px"
              defaultLanguage="json"
              value={jsonBody}
              onChange={handleJsonChange}
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
        );
      case "form-data":
        return (
          <KeyValueTable
            data={formData}
            setData={(newData) => handleFormDataChange(newData, "form-data")}
            title="Form Field"
          />
        );
      case "x-www-form-urlencoded":
        return (
          <KeyValueTable
            data={urlEncodedData}
            setData={(newData) =>
              handleFormDataChange(newData, "x-www-form-urlencoded")
            }
            title="Form Field"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <Label>Body</Label>
      <RadioGroup value={bodyType} onValueChange={handleBodyTypeChangeInternal}>
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
        {renderBodyContent()}
        {bodyType === "json" && validationError && (
          <p className="text-red-500 text-sm mt-1">{validationError}</p>
        )}
      </div>
    </div>
  );
}
