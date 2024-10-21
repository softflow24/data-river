import { registerBlockType } from "../blockFactory";

import { DatabaseBlock } from "./DatabaseBlock";
import { OpenAIBlock } from "./OpenAI/OpenAIBlock";
import { OpenAIStructuredBlock } from "./OpenAI/OpenAIStructuredBlock";

registerBlockType("database", DatabaseBlock);
registerBlockType("openai", OpenAIBlock);
registerBlockType("openai_structured", OpenAIStructuredBlock);
