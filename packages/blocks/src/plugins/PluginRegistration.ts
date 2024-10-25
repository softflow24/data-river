import { registerBlockType } from "../blockFactory";

// If you have other non-dynamically loaded blocks, you can still register them directly
// import { DatabaseBlock } from "./DatabaseBlock";
// registerBlockType("database", DatabaseBlock);

// call this function for registering all plugin blocks to the registry
// ready for dynamic loading when the block is used
export async function initializePlugins() {
  const OpenAIBlockImporter = () =>
    import("./OpenAI/OpenAIBlock").then((module) => module.OpenAIBlock);
  const OpenAIStructuredBlockImporter = () =>
    import("./OpenAI/OpenAIStructuredBlock").then(
      (module) => module.OpenAIStructuredBlock,
    );

  registerBlockType("blocks/openai@0.1", OpenAIBlockImporter);
  registerBlockType(
    "blocks/openai-structured@0.1",
    OpenAIStructuredBlockImporter,
  );
}
