import { IBlock, IBlockConfig } from "@data-river/shared/interfaces";

class SimpleBlock implements IBlock {
  config: IBlockConfig;

  constructor(config: IBlockConfig) {
    this.config = config;
  }

  process(inputs: Record<string, any>): Promise<Record<string, any>> {
    // Updated return type
    const output: Record<string, any> = {};
    // Detailed processing logic here
    return Promise.resolve(output); // Ensure to return a Promise
  }
}

export default SimpleBlock;
