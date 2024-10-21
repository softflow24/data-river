import { registerBlockType } from "../blockFactory";

// Dynamic imports for OpenAI blocks
const OpenAIBlockImporter = () =>
  import("./OpenAI/OpenAIBlock").then((module) => module.OpenAIBlock);
const OpenAIStructuredBlockImporter = () =>
  import("./OpenAI/OpenAIStructuredBlock").then(
    (module) => module.OpenAIStructuredBlock,
  );

// Register blocks with dynamic imports
registerBlockType("openai", OpenAIBlockImporter);
registerBlockType("openai_structured", OpenAIStructuredBlockImporter);

// If you have other non-dynamically loaded blocks, you can still register them directly
// import { DatabaseBlock } from "./DatabaseBlock";
// registerBlockType("database", DatabaseBlock);

// call this function for registering all plugin blocks to the registry
// ready for dynamic loading when the block is used
export async function initializePlugins() {
  console.log("Plugins initialized and ready for dynamic loading");
}
