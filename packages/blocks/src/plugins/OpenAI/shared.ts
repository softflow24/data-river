import { z } from "zod";
import OpenAI from "openai";

// Common base configuration schema
export const BaseOpenAIConfigSchema = z.object({
  apiKey: z.string().min(1, "API Key is required"),
  model: z.string().min(1, "Model is required"),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().int().positive().optional(),
});

// Common message schema
export const MessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string(),
});

// Common input schema
export const BaseInputSchema = z.object({
  systemPrompt: z.string().optional(),
});

// Function for creating OpenAI client
export const createOpenAIClient = (apiKey: string) => {
  return new OpenAI({ apiKey });
};
