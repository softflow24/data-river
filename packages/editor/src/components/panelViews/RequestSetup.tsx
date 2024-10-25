import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  Badge,
} from "@data-river/shared/ui";
import {
  RequestFormSchema,
  RequestFormData,
} from "@data-river/shared/contracts/blocks/request";
import { KeyValuePair } from "./Request/QueryParamsTable";
import _ from "lodash";
import { ParamsTab } from "./Request/ParamsTab";
import { HeadersTab } from "./Request/HeadersTab";
import { BodyTab, RequestBodyType } from "./Request/BodyTab";

export default function RequestSetup({
  nodeId,
  config,
  onConfigChange,
}: {
  nodeId: string;
  config: RequestFormData;
  onConfigChange: (config: RequestFormData) => void;
}) {
  const [validationError, setValidationError] = useState<string | null>(null);
  const [queryParams, setQueryParams] = useState<KeyValuePair[]>(() => {
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
  });
  const [headers, setHeaders] = useState<KeyValuePair[]>(
    config.headers?.map((h) => ({ ...h, id: _.uniqueId("header-") })) || [],
  );
  const [bodyType, setBodyType] = useState<RequestBodyType>(
    config.bodyType || "none",
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
      headers: config.headers,
      body: config.body,
      queryParams: config.queryParams,
      bodyType: config.bodyType || "none",
    },
  });

  const { toast } = useToast();

  const saveConfiguration = () => {
    const formData = getValues();
    onConfigChange({
      ...formData,
      headers: headers.map(({ key, value }) => ({ key, value })),
      queryParams: Object.fromEntries(
        queryParams.map((param) => [param.key, param.value]),
      ),
      bodyType,
    });

    toast({
      title: "Request configuration saved",
      description: "Your request configuration has been saved",
    });
  };

  const body = watch("body");
  const watchedBodyType = watch("bodyType");

  useEffect(() => {
    setBodyType(watchedBodyType as RequestBodyType);
  }, [watchedBodyType]);

  useEffect(() => {
    if (body && bodyType) {
      try {
        switch (bodyType) {
          case "json":
            JSON.parse(body);
            setValidationError(null);
            break;
          case "form-data":
          case "x-www-form-urlencoded":
            // Basic validation for form data
            if (!/^(.+=.+(&.+=.+)*)?$/.test(body)) {
              setValidationError("Invalid form data format");
            } else {
              setValidationError(null);
            }
            break;
          case "none":
            setValidationError(null);
            break;
        }
      } catch (error) {
        setValidationError("Invalid format for selected body type");
      }
    } else {
      setValidationError(null);
    }
  }, [body, bodyType]);

  const handleBodyChange = (value: string | undefined) => {
    setValue("body", value || "");
  };

  const handleBodyTypeChange = (value: RequestBodyType) => {
    setValue("bodyType", value);
    setBodyType(value);
    if (value === "none") {
      setValue("body", "");
    } else if (value === "json" && (!body || body === "")) {
      setValue("body", "{}");
    }
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
                <ParamsTab
                  queryParams={queryParams}
                  setQueryParams={setQueryParams}
                />
              </TabsContent>
              <TabsContent value="headers">
                <HeadersTab headers={headers} setHeaders={setHeaders} />
              </TabsContent>
              <TabsContent value="body">
                <BodyTab
                  body={body || ""}
                  bodyType={bodyType}
                  handleBodyChange={handleBodyChange}
                  handleBodyTypeChange={handleBodyTypeChange}
                  validationError={validationError}
                />
              </TabsContent>
            </Tabs>
          </div>

          <Button
            onClick={saveConfiguration}
            className="mt-4"
            disabled={!!validationError}
          >
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
}
