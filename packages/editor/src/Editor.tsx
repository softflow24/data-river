import React, { FC } from "react";
import { IWorkflow } from "@data-river/shared/interfaces";

const Editor: FC = () => {
  const workflow: IWorkflow = {
    id: "example-workflow",
    blocks: [
      {
        id: "block1",
        type: "simple",
        inputs: { input1: "{{globalVar}}" },
        outputs: { result: "output1" },
        retry: 2,
        timeout: 5000,
        onError: (error, blockConfig) => console.error(error),
      },
      {
        id: "block2",
        type: "simple",
        inputs: { input1: "{{output1}}" },
        outputs: { result: "output2" },
      },
    ],
    connections: [
      { from: "block1", to: "block2", inputKey: "input1", outputKey: "result" },
    ],
    environment: {
      variables: { globalVar: "testValue" },
    },
    config: {
      maxConcurrentTasks: 5,
      supportsWebSocket: true,
      executionContext: "browser",
      retryOnFailure: true,
    },
  };

  return (
    <div>
      <h1>Data River Editor</h1>
      <button>Run Workflow</button>
    </div>
  );
};

export default Editor;
