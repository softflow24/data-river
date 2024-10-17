import { z } from "zod";

export const HeaderSchema = z.object({
  key: z.string().min(1, "Header key is required"),
  value: z.string().min(1, "Header value is required"),
});

export const RequestFormSchema = z
  .object({
    httpMethod: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
    url: z.string().url("Invalid URL"),
    headers: z.array(HeaderSchema).optional(),
    queryParams: z.record(z.string(), z.string()).optional(),
    bodyType: z.enum(["json", "form-data", "x-www-form-urlencoded"]).optional(),
    body: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.bodyType && data.body) {
      switch (data.bodyType) {
        case "json":
          try {
            JSON.parse(data.body);
          } catch (error) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Invalid JSON format",
              path: ["body"],
            });
          }
          break;
        case "form-data":
          // Basic check for form-data format (key=value pairs)
          if (!/^(.+=.+(\r\n|\n)?)+$/.test(data.body)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Invalid form-data format",
              path: ["body"],
            });
          }
          break;
        case "x-www-form-urlencoded":
          // Basic check for x-www-form-urlencoded format
          if (!/^([^=&]+=[^=&]*&?)+$/.test(data.body)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Invalid x-www-form-urlencoded format",
              path: ["body"],
            });
          }
          break;
      }
    }
  });

export type RequestFormData = z.infer<typeof RequestFormSchema>;
