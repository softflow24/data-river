import { z } from "zod";

// Common base configuration schema
export const BaseOpenAIConfigSchema = z.object({
  apiKey: z.string().min(1, "API Key is required"),
  model: z.string().min(1, "Model is required"),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().int().positive().optional(),
});

// OpenAIBlock specific config
export const OpenAIConfigSchema = BaseOpenAIConfigSchema.extend({
  topP: z.number().min(0).max(1).optional(),
  frequencyPenalty: z.number().min(-2).max(2).optional(),
  presencePenalty: z.number().min(-2).max(2).optional(),
  stop: z.union([z.string(), z.array(z.string())]).optional(),
});

// OpenAIStructuredBlock specific config
const FunctionSchema = z.object({
  name: z.string(),
  description: z.string(),
  parameters: z.record(z.unknown()),
});

const FunctionCallingSchema = BaseOpenAIConfigSchema.extend({
  type: z.literal("functionCalling"),
  functions: z.array(FunctionSchema).min(1).max(20),
});

const StructuredResponseSchema = BaseOpenAIConfigSchema.extend({
  type: z.literal("structuredResponse"),
  schema: z
    .object({
      type: z.literal("object"),
      properties: z.record(z.unknown()),
      required: z.array(z.string()).optional(),
      additionalProperties: z.boolean().optional(),
    })
    .refine(
      (schema) => Object.keys(schema.properties).length > 0,
      "JSON schema properties are required and cannot be empty",
    ),
});

export const OpenAIStructuredConfigSchema = z.discriminatedUnion("type", [
  FunctionCallingSchema,
  StructuredResponseSchema,
]);

// Export types
export type OpenAIConfig = z.infer<typeof OpenAIConfigSchema>;
export type OpenAIStructuredConfig = z.infer<
  typeof OpenAIStructuredConfigSchema
>;
