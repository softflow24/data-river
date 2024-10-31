import { CustomEvaluatorFunction } from "@data-river/shared/types";
import { ICondition } from "@data-river/shared/interfaces/ICondition";

export class CustomEvaluatorStrategy {
  private static createSandbox(inputs: Record<string, unknown>) {
    const sandbox: Record<string, unknown> = {
      inputs,
      console: {
        log: (...args: any[]) => console.log("Custom Evaluator:", ...args),
        warn: (...args: any[]) => console.warn("Custom Evaluator:", ...args),
        error: (...args: any[]) => console.error("Custom Evaluator:", ...args),
      },
      Math: Object.freeze({ ...Math }),
      Date: Object.freeze(Date),
      JSON: Object.freeze(JSON),
      String: Object.freeze(String),
      Number: Object.freeze(Number),
      Boolean: Object.freeze(Boolean),
      Array: Object.freeze(Array),
      Object: Object.freeze(Object),
    };

    // For browser environments
    if (typeof window !== "undefined") {
      sandbox.window = undefined;
      sandbox.document = undefined;
    }

    // For Node.js environments
    if (typeof process !== "undefined") {
      sandbox.process = undefined;
      sandbox.require = undefined;
    }

    return sandbox;
  }

  private static validateCode(code: string): boolean {
    const blacklist = [
      "eval",
      "Function",
      "setTimeout",
      "setInterval",
      "setImmediate",
      "XMLHttpRequest",
      "fetch",
      "WebSocket",
      "Worker",
      "import",
      "require",
    ];
    const regex = new RegExp(`\\b(${blacklist.join("|")})\\b`);
    return !regex.test(code);
  }

  static createEvaluator(
    code: string,
    timeout: number = 1000,
  ): CustomEvaluatorFunction {
    if (!this.validateCode(code)) {
      throw new Error("Invalid code in custom evaluator");
    }

    return (condition: ICondition, inputs: Record<string, unknown>) => {
      const sandbox = this.createSandbox(inputs);

      const safeEval = new Function(
        ...Object.keys(sandbox),
        `
        "use strict";
        return (${code});
      `,
      );

      try {
        let isTimedOut = false;
        const timeoutId = setTimeout(() => {
          isTimedOut = true;
          throw new Error("Evaluation timed out");
        }, timeout);

        const result = safeEval(...Object.values(sandbox)) as boolean;

        clearTimeout(timeoutId);

        if (isTimedOut) {
          throw new Error("Evaluation timed out");
        }

        return result;
      } catch (error) {
        console.error("Error in custom evaluator:", error);
        return false;
      }
    };
  }

  static createCodeBlockEvaluator(
    code: string,
    timeout: number = 5000,
  ): (inputs: Record<string, unknown>) => unknown {
    if (!this.validateCode(code)) {
      throw new Error("Invalid code in code block evaluator");
    }

    return (inputs: Record<string, unknown>) => {
      const sandbox = this.createSandbox(inputs);

      const safeEval = new Function(
        ...Object.keys(sandbox),
        `
        "use strict";
        ${code}
      `,
      );

      try {
        let isTimedOut = false;
        const timeoutId = setTimeout(() => {
          isTimedOut = true;
          throw new Error("Execution timed out");
        }, timeout);

        const result = safeEval(...Object.values(sandbox));

        clearTimeout(timeoutId);

        if (isTimedOut) {
          throw new Error("Execution timed out");
        }

        return result;
      } catch (error) {
        console.error("Error in code block evaluator:", error);
        throw error;
      }
    };
  }
}
