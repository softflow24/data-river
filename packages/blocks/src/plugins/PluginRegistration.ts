import { registerBlockType } from "../blockFactory";

import { DatabaseBlock } from "./DatabaseBlock";

import { RequestBlock } from "./RequestBlock";

registerBlockType("database", DatabaseBlock);

registerBlockType("request", RequestBlock);
