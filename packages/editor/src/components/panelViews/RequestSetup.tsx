import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { z } from "zod";
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
} from "@data-river/shared/ui";
import MonacoEditorWrapper from "../MonacoEditorWrapper";

const HeaderSchema = z.object({
  key: z.string().nonempty("Header key is required"),
  value: z.string().nonempty("Header value is required"),
});

const RequestFormSchema = z.object({
  httpMethod: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  route: z.string().url("Invalid URL"),
  headers: z.array(HeaderSchema).optional(),
  body: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        try {
          JSON.parse(value);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Invalid JSON format" },
    ),
});

type FormData = z.infer<typeof RequestFormSchema>;

export default function RequestBlock() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(RequestFormSchema),
    defaultValues: {
      httpMethod: "GET",
      route: "https://",
      headers: [
        { key: "Content-Type", value: "application/json" },
        { key: "Accept", value: "application/json" },
      ],
      body: `{

}`,
    },
  });

  const onSubmit = (data: FormData) => {
    // dispatch(updateRequestBlock(data));
    setIsOpen(false);
  };

  const httpMethod = watch("httpMethod");
  const route = watch("route");
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
    const headers = watch("headers") || [];
    headers.push({ key: "", value: "" });
    setValue("headers", headers);
  };

  const removeHeader = (index: number) => {
    const headers = watch("headers") || [];
    headers.splice(index, 1);
    setValue("headers", headers);
  };

  const handleEditorChange = (value: string | undefined) => {
    setValue("body", value || "{}");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-background shadow-sm rounded-lg px-4 mb-4">
        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
              httpMethod === "GET"
                ? "bg-blue-100 text-blue-800"
                : httpMethod === "POST"
                  ? "bg-green-100 text-green-800"
                  : httpMethod === "PUT"
                    ? "bg-yellow-100 text-yellow-800"
                    : httpMethod === "DELETE"
                      ? "bg-red-100 text-red-800"
                      : "bg-purple-100 text-purple-800"
            }`}
          >
            {httpMethod}
          </span>
          <span className="font-semibold">{route || "/path"}</span>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-background shadow-sm rounded-lg py-4"
        >
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
                  id="route"
                  {...register("route")}
                  placeholder="https://api.example.com/users"
                  className="min-w-64 truncate"
                />
                {errors.route && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.route.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label>Headers</Label>
              {watch("headers")?.map((_, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <Input
                    {...register(`headers.${index}.key`)}
                    placeholder="Key"
                    className="w-40 grow-0 truncate"
                  />
                  <Input
                    {...register(`headers.${index}.value`)}
                    placeholder="Value"
                    className="w-40 grow truncate"
                  />
                  <Button
                    className="shrink-0"
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeHeader(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
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
          </div>

          <Button type="submit" className="mt-4" disabled={!!jsonError}>
            Save Configuration
          </Button>
        </form>
      </div>
    </div>
  );
}
