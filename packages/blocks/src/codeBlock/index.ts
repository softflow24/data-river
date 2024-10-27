import { IBlockConfig } from "@data-river/shared/interfaces";
import { ILogger } from "@data-river/shared/interfaces/ILogger";
import { Block } from "@/block";
import { CustomEvaluatorStrategy } from "@/utils/customEvaluatorStrategy";

export interface CodeBlockConfig {
  code: string; // return inputs.data.abilities[0].ability.name
  timeout?: number;
}

export class CodeBlock extends Block {
  private code: string;
  private executeFunction: (inputs: Record<string, unknown>) => unknown;

  constructor(config: IBlockConfig, logger: ILogger) {
    super(config, logger);
    const codeConfig = config.config as unknown as CodeBlockConfig;
    this.code = codeConfig.code || "";
    this.executeFunction = this.createExecuteFunction();
  }

  private createExecuteFunction(): (
    inputs: Record<string, unknown>,
  ) => unknown {
    const wrappedCode = `
      function execute(inputs) {
        ${this.code}
      }
      return execute(inputs);
    `;

    return CustomEvaluatorStrategy.createCodeBlockEvaluator(
      wrappedCode,
      this.timeout,
    );
  }

  execute(inputs: Record<string, unknown>): Promise<Record<string, unknown>> {
    try {
      const result = this.executeFunction(inputs);
      this.logger.debug("Code block execution result:", result);
      return Promise.resolve({ result });
    } catch (error) {
      this.logger.error("Error executing code block:", error);
      throw error;
    }
  }
}
