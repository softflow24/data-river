import { IBlockConfig } from "@data-river/shared/interfaces";
import { Block } from "../../block";
import { ILogger } from "@data-river/shared/interfaces/ILogger";
import OpenAI from "openai";
import { z } from "zod";
import { BlockConfigurationError } from "../../errors/blockValidationError";
import { formatZodError } from "../../errors/errorUtils";
import {
  BaseOpenAIConfigSchema,
  MessageSchema,
  BaseInputSchema,
  createOpenAIClient,
} from "./shared";

// Extend the base config schema for OpenAIBlock specific needs
export const OpenAIConfigSchema = BaseOpenAIConfigSchema.extend({
  topP: z.number().min(0).max(1).optional(),
  frequencyPenalty: z.number().min(-2).max(2).optional(),
  presencePenalty: z.number().min(-2).max(2).optional(),
  stop: z.union([z.string(), z.array(z.string())]).optional(),
});

export type OpenAIConfig = z.infer<typeof OpenAIConfigSchema>;

// Extend the base input schema for OpenAIBlock specific needs
const InputSchema = BaseInputSchema.extend({
  messages: z.array(MessageSchema).optional(),
  prompt: z.string().optional(),
});

export class OpenAIBlock extends Block {
  private openai: OpenAI;
  private openAIConfig: OpenAIConfig;

  constructor(config: IBlockConfig, logger: ILogger) {
    super(config, logger);
    if (!config.config || typeof config.config !== "object") {
      throw new BlockConfigurationError(
        "OpenAI configuration is missing or invalid",
        {
          config: ["Configuration must be an object"],
        },
      );
    }
    const parsedConfigResult = OpenAIConfigSchema.safeParse(config.config);

    if (!parsedConfigResult.success) {
      this.logger.error(
        `OpenAI configuration is invalid: ${parsedConfigResult.error.message}`,
      );

      throw new BlockConfigurationError(
        "OpenAI configuration validation failed",
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

    let messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

    if (validatedInputs.messages) {
      messages = validatedInputs.messages;
    } else {
      if (validatedInputs.systemPrompt) {
        messages.push({
          role: "system",
          content: validatedInputs.systemPrompt,
        });
      }
      if (validatedInputs.prompt) {
        messages.push({ role: "user", content: validatedInputs.prompt });
      }
    }

    if (messages.length === 0) {
      throw new Error(
        "No messages provided. Please provide either 'messages', 'prompt', or 'systemPrompt'.",
      );
    }

    const stream = await this.openai.chat.completions.create({
      model: this.openAIConfig.model,
      messages: messages,
      stream: true,
      temperature: this.openAIConfig.temperature,
      max_tokens: this.openAIConfig.maxTokens,
      top_p: this.openAIConfig.topP,
      frequency_penalty: this.openAIConfig.frequencyPenalty,
      presence_penalty: this.openAIConfig.presencePenalty,
      stop: this.openAIConfig.stop,
    });

    let fullResponse = "";
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      fullResponse += content;
      // In the future, we can implement streaming here
    }

    return { response: fullResponse };
  }
}
