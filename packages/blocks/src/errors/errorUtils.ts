import { ZodError } from "zod";

export function formatZodError(error: ZodError): Record<string, string[]> {
  const formattedErrors: Record<string, string[]> = {};
  error.issues.forEach((issue) => {
    const path = issue.path.join(".");
    if (!formattedErrors[path]) {
      formattedErrors[path] = [];
    }
    formattedErrors[path].push(issue.message);
  });
  return formattedErrors;
}
