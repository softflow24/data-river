import { z } from "zod";

export const OpenAIOutputSchema = z.object({
  response: z.string(),
});

export const OpenAIStructuredOutputSchema = z.object({
  response: z.record(z.unknown()),
});

// Export types
export type OpenAIOutput = z.infer<typeof OpenAIOutputSchema>;
export type OpenAIStructuredOutput = z.infer<
  typeof OpenAIStructuredOutputSchema
>;
