import "reflect-metadata";
import {
  IBlock,
  IBlockConfig,
  IEnvironment,
  IWorkflowConfig,
} from "@data-river/shared/src/interfaces";

import { IExecutionStrategy } from "../src/strategies/IExecutionStrategy";
import { ExecutionEngine } from "../src/ExecutionEngine";
import { VariableResolver } from "../src/VariableResolver";
class MockExecutionStrategy implements IExecutionStrategy {
  async execute(blockConfig: IBlockConfig): Promise<IBlock> {
    return this.createBlockInstance(blockConfig);
  }

  createBlockInstance(blockConfig: IBlockConfig): IBlock {
    return {
      id: blockConfig.id,
      type: blockConfig.type,
      inputs: {},
      outputs: {},
      retry: 0,
      timeout: 0,
      onError: () => {},
      execute: async (
        inputs: Record<string, unknown>,
      ): Promise<Record<string, unknown>> => {
        return { mockOutput: "test" };
      },
      safeExecute: async (
        inputs: Record<string, unknown>,
      ): Promise<Record<string, unknown>> => {
        return { mockOutput: "test" };
      },
      handleError: () => {},
    };
  }
}

class MockVariableResolver extends VariableResolver {}

describe("ExecutionEngine", () => {
  let engine: ExecutionEngine;
  const config: IWorkflowConfig = {
    maxConcurrentTasks: 5,
    supportsWebSocket: true,
    executionContext: "browser",
    connections: [],
  };

  const environment: IEnvironment = {
    variables: { apiKey: "test_key" },
  };

  beforeEach(() => {
    const mockVariableResolver = new MockVariableResolver();
    const mockStrategy = new MockExecutionStrategy();
    engine = new ExecutionEngine(
      config,
      environment,
      mockVariableResolver,
      mockStrategy,
    );
  });

  test("should execute workflow blocks", async () => {
    const workflow: IBlockConfig[] = [{ id: "1", type: "simple", inputs: {} }];

    await engine.executeWorkflow(workflow);

    expect(engine.getWorkflowState()).toEqual({ "1": {} });
  });
});
