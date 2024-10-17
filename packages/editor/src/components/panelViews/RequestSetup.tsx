import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Trash2 } from "lucide-react";
import {
  Select,
  Input,
  Button,
  Label,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
  useToast,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@data-river/shared/ui";
import MonacoEditorWrapper from "../MonacoEditorWrapper";
import {
  RequestFormSchema,
  RequestFormData,
} from "@data-river/shared/contracts/blocks/request";
import { QueryParamsTable, QueryParam } from "./Request/QueryParamsTable";
import _ from "lodash";

export default function RequestSetup({
  nodeId,
  config,
  onConfigChange,
}: {
  nodeId: string;
  config: RequestFormData;
  onConfigChange: (config: RequestFormData) => void;
}) {
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [existingQueryParams, setExistingQueryParams] = useState<QueryParam[]>(
    () => {
      if (Array.isArray(config.queryParams)) {
        return config.queryParams;
      } else if (
        typeof config.queryParams === "object" &&
        config.queryParams !== null
      ) {
        return Object.entries(config.queryParams).map(([key, value]) => ({
          id: _.uniqueId("query-param-"),
          key,
          value,
        }));
      }
      return [];
    },
  );
  const [headers, setHeaders] = useState(
    config.headers || [{ key: "", value: "" }],
  );

  const {
    control,
    register,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm<RequestFormData>({
    resolver: zodResolver(RequestFormSchema),
    defaultValues: {
      httpMethod: config.httpMethod,
      url: config.url,
      headers: headers,
      body: config.body,
      queryParams: config.queryParams,
    },
  });

  const { toast } = useToast();

  const saveConfiguration = () => {
    const formData = getValues();
    console.log("Saving configuration", formData);
    onConfigChange({
      ...formData,
      headers: headers,
      queryParams: Object.fromEntries(
        existingQueryParams.map((param) => [param.key, param.value]),
      ),
    });

    toast({
      title: "Request configuration saved",
      description: "Your request configuration has been saved",
    });
  };

  const body = watch("body");

  useEffect(() => {
    if (body) {
      try {
        JSON.parse(body);
        setJsonError(null);
      } catch (error) {
        setJsonError("Invalid JSON format");
      }
    } else {
      setJsonError(null);
    }
  }, [body]);

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const removeHeader = (index: number) => {
    const newHeaders = [...headers];
    newHeaders.splice(index, 1);
    setHeaders(newHeaders);
  };

  const updateHeader = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const handleEditorChange = (value: string | undefined) => {
    setValue("body", value || "{}");
  };

  const handleQueryParamsChange = (updatedParams: QueryParam[]) => {
    setExistingQueryParams(updatedParams);
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-w-[26rem]">
      <div className="bg-background shadow-sm rounded-lg px-4 mb-4">
        <div className="bg-background shadow-sm rounded-lg py-4">
          <div className="space-y-4">
            <div className="flex flex-row gap-2 animate">
              <div className="flex-none hover:grow w-24 max-w-28 transition-[flex-grow] duration-300">
                <Label htmlFor="httpMethod">HTTP Method</Label>
                <Controller
                  name="httpMethod"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="httpMethod">
                        <SelectValue placeholder="Select HTTP method" />
                      </SelectTrigger>
                      <SelectContent>
                        {["GET", "POST", "PUT", "DELETE", "PATCH"].map(
                          (method) => (
                            <SelectItem key={method} value={method}>
                              {method}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="w-40 grow">
                <Label htmlFor="route">Route</Label>
                <Input
                  id="url"
                  {...register("url")}
                  placeholder="https://api.example.com/users"
                  className="min-w-64 truncate"
                />
                {errors.url && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.url.message}
                  </p>
                )}
              </div>
            </div>

            <Tabs defaultValue="params" className="w-full">
              <TabsList>
                <TabsTrigger value="params">Params</TabsTrigger>
                <TabsTrigger value="headers">Headers</TabsTrigger>
                <TabsTrigger value="body">Body</TabsTrigger>
              </TabsList>
              <TabsContent value="params">
                <div className="mt-6">
                  <Label>Query Parameters</Label>
                  <QueryParamsTable
                    data={existingQueryParams}
                    setData={handleQueryParamsChange}
                  />
                </div>
              </TabsContent>
              <TabsContent value="headers">
                <div>
                  <Label>Headers</Label>
                  {headers.map((header, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mt-2"
                    >
                      <Input
                        value={header.key}
                        onChange={(e) =>
                          updateHeader(index, "key", e.target.value)
                        }
                        placeholder="Key"
                        className="w-40 grow-0 truncate"
                      />
                      <Input
                        value={header.value}
                        onChange={(e) =>
                          updateHeader(index, "value", e.target.value)
                        }
                        placeholder="Value"
                        className="w-40 grow truncate"
                      />
                      <Button
                        className="shrink-0"
                        type="button"
                        variant="outline"
                        size="icon"
                        disabled={headers.length === 1}
                        onClick={() => removeHeader(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addHeader}
                      className="mt-2"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Header
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="body">
                <div>
                  <Label htmlFor="body">Body (JSON)</Label>
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
                      }}
                    />
                  </div>
                  {jsonError && (
                    <p className="text-red-500 text-sm mt-1">{jsonError}</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <Button
            onClick={saveConfiguration}
            className="mt-4"
            disabled={!!jsonError}
          >
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
}
