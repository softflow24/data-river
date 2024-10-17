import { registerBlockType } from "../blockFactory";

import { DatabaseBlock } from "./DatabaseBlock";

registerBlockType("database", DatabaseBlock);
