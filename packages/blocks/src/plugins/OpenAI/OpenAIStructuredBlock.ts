import { IBlockConfig } from "@data-river/shared/interfaces";
import { Block } from "../../block";
import { ILogger } from "@data-river/shared/interfaces/ILogger";
import OpenAI from "openai";
import { z } from "zod";
import { BlockConfigurationError } from "../../errors/blockValidationError";
import { formatZodError } from "../../errors/errorUtils";
import {
  BaseOpenAIConfigSchema,
  BaseInputSchema,
  createOpenAIClient,
} from "./shared";
import {
  OpenAIError,
  OpenAIResponseError,
  OpenAIIncompleteResponseError,
  OpenAIRefusalError,
  OpenAIParseError,
} from "./errors";

// Define the function schema
const FunctionSchema = z.object({
  name: z.string(),
  description: z.string(),
  parameters: z.record(z.unknown()),
});

// Extend the base config schema for function calling
const FunctionCallingSchema = BaseOpenAIConfigSchema.extend({
  type: z.literal("functionCalling"),
  functions: z.array(FunctionSchema).min(1).max(20),
});

// Extend the base config schema for structured response
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
      (schema) =>
        Object.keys(schema).length > 0 ||
        Object.keys(schema.properties).length > 0,
      "JSON schema and it's properties are required and cannot be not provided",
    ),
});

export const OpenAIStructuredConfigSchema = z.discriminatedUnion("type", [
  FunctionCallingSchema,
  StructuredResponseSchema,
]);

export type OpenAIStructuredConfig = z.infer<
  typeof OpenAIStructuredConfigSchema
>;

// Extend the base input schema for OpenAIStructuredBlock specific needs
const InputSchema = BaseInputSchema.extend({
  prompt: z.string(),
});

export class OpenAIStructuredBlock extends Block {
  private openai: OpenAI;
  private openAIConfig: OpenAIStructuredConfig;

  constructor(config: IBlockConfig, logger: ILogger) {
    super(config, logger);
    if (!config.config || typeof config.config !== "object") {
      throw new BlockConfigurationError(
        "OpenAI structured configuration is missing or invalid",
        {
          config: ["Configuration must be an object"],
        },
      );
    }
    const parsedConfigResult = OpenAIStructuredConfigSchema.safeParse(
      config.config,
    );

    if (!parsedConfigResult.success) {
      this.logger.error(
        `OpenAI structured configuration is invalid: ${parsedConfigResult.error.message}`,
      );
      throw new BlockConfigurationError(
        "OpenAI structured configuration validation failed",
        formatZodError(parsedConfigResult.error),
      );
    }

    this.openAIConfig = parsedConfigResult.data;
    this.openai = createOpenAIClient(this.openAIConfig.apiKey);
  }

  async execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const validatedInputs = InputSchema.parse(inputs);

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

    if (validatedInputs.systemPrompt) {
      messages.push({
        role: "system",
        content: validatedInputs.systemPrompt,
      });
    }

    messages.push({ role: "user", content: validatedInputs.prompt });

    if (this.openAIConfig.type === "functionCalling") {
      return this.executeFunctionCall(messages);
    } else {
      return this.executeStructuredResponse(messages);
    }
  }

  private async executeFunctionCall(
    messages: OpenAI.Chat.ChatCompletionMessageParam[],
  ): Promise<Record<string, unknown>> {
    if (this.openAIConfig.type !== "functionCalling") {
      throw new Error("Invalid configuration for function calling");
    }

    const response = await this.openai.chat.completions.create({
      model: this.openAIConfig.model,
      messages: messages,
      functions: this.openAIConfig.functions,
      temperature: this.openAIConfig.temperature,
      max_tokens: this.openAIConfig.maxTokens,
    });

    const toolCalls = response.choices[0].message.tool_calls;
    if (!toolCalls || toolCalls.length === 0) {
      throw new Error(
        "Unexpected response format from OpenAI: No tool calls received",
      );
    }

    const functionCall = toolCalls[0];
    if (functionCall.type !== "function") {
      throw new Error(`Unexpected tool call type: ${functionCall.type}`);
    }

    return {
      function: functionCall.function.name,
      arguments: JSON.parse(functionCall.function.arguments || "{}"),
    };
  }

  private async executeStructuredResponse(
    messages: OpenAI.Chat.ChatCompletionMessageParam[],
  ): Promise<Record<string, unknown>> {
    if (this.openAIConfig.type !== "structuredResponse") {
      throw new OpenAIError("Invalid configuration for structured response");
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: this.openAIConfig.model,
        messages: messages,
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "schema",
            schema: this.openAIConfig.schema,
            strict: true,
          },
        },
        temperature: this.openAIConfig.temperature,
        max_tokens: this.openAIConfig.maxTokens,
      });

      if (response.choices[0].finish_reason === "length") {
        throw new OpenAIIncompleteResponseError(
          "Incomplete response: max tokens reached",
          response,
        );
      }

      const message = response.choices[0].message;

      if (message.refusal) {
        throw new OpenAIRefusalError(
          `Response refused: ${message.refusal}`,
          response,
        );
      }

      if (!message.content) {
        throw new OpenAIResponseError(
          "Unexpected empty response from OpenAI",
          response,
        );
      }

      let parsedContent: Record<string, unknown>;
      try {
        parsedContent = JSON.parse(message.content);
      } catch {
        throw new OpenAIParseError(
          "Failed to parse JSON response",
          message.content,
        );
      }

      return { response: parsedContent };
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        throw new OpenAIResponseError(
          `OpenAI API error: ${error.message}`,
          error,
        );
      } else if (error instanceof OpenAIError) {
        // Re-throw our custom OpenAI errors
        throw error;
      } else {
        // Handle any other unexpected errors
        throw new OpenAIError(`Unexpected error: ${String(error)}`);
      }
    }
  }
}
