// Export schemas
export * from "./schemas/config";
export * from "./schemas/input";
export * from "./schemas/output";

// Export error types
export * from "./errors";

// Export block types (but not the implementations)
export type { OpenAIBlock } from "./OpenAIBlock";
export type { OpenAIStructuredBlock } from "./OpenAIStructuredBlock";

// Export a function to get the block implementations
export const getOpenAIBlocks = () => ({
  OpenAIBlock: import("./OpenAIBlock").then((module) => module.OpenAIBlock),
  OpenAIStructuredBlock: import("./OpenAIStructuredBlock").then(
    (module) => module.OpenAIStructuredBlock,
  ),
});
