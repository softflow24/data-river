import { z } from "zod";

export const MessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string(),
});

export const BaseInputSchema = z.object({
  systemPrompt: z.string().optional(),
});

export const OpenAIInputSchema = BaseInputSchema.extend({
  messages: z.array(MessageSchema).optional(),
  prompt: z.string().optional(),
});

export const OpenAIStructuredInputSchema = BaseInputSchema.extend({
  prompt: z.string(),
});

// Export types
export type OpenAIInput = z.infer<typeof OpenAIInputSchema>;
export type OpenAIStructuredInput = z.infer<typeof OpenAIStructuredInputSchema>;
