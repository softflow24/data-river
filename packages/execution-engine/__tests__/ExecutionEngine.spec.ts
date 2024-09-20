import { ExecutionEngine } from "@data-river/execution-engine";
import { IExecutionStrategy } from "@data-river/execution-engine/src/strategies/IExecutionStrategy";
import {
  IWorkflowConfig,
  IBlockConfig,
  IEnvironment,
} from "@data-river/shared/interfaces";

class MockExecutionStrategy implements IExecutionStrategy {
  async execute(
    blockConfig: IBlockConfig,
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    return { mockOutput: "test" };
  }

  createBlockInstance(blockConfig: IBlockConfig): IBlock {
    return { config: blockConfig, process: jest.fn() };
  }
}

describe("ExecutionEngine", () => {
  let engine: ExecutionEngine;
  const config: IWorkflowConfig = {
    maxConcurrentTasks: 5,
    supportsWebSocket: true,
    executionContext: "browser",
  };

  const environment: IEnvironment = {
    variables: { apiKey: "test_key" },
  };

  beforeEach(() => {
    const mockStrategy = new MockExecutionStrategy();
    engine = new ExecutionEngine(config, environment, mockStrategy);
  });

  test("should execute workflow blocks", async () => {
    const workflow: IBlockConfig[] = [
      { id: "1", type: "simple", inputs: {}, outputs: {} },
    ];

    await engine.executeWorkflow(workflow);

    expect(engine.getWorkflowState()).toEqual({ "1": { mockOutput: "test" } });
  });
});
