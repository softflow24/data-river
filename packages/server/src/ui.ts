import { createExecutionEngine } from "@execution-engine";

const isServer = false; // Set this based on your environment
const engine = createExecutionEngine(
  isServer,
  {
    maxConcurrentTasks: 1,
    executionContext: isServer ? "server" : "browser",
    supportsWebSocket: isServer,
    retryOnFailure: false,
  },
  {
    variables: {},
  },
  [],
);

if (isServer) {
  // WebSocket connection should be implemented with proper security measures
  // and the URL should be configurable, not hardcoded
  // Example: const ws = new WebSocket(process.env.WEBSOCKET_URL);
  // ws.onmessage = (event) => {
  //   const { blockId, outputs } = JSON.parse(event.data);
  //   // Update your UI with the real-time block execution results
  //   console.log(`Block ${blockId} executed with outputs:`, outputs);
  // };
}

// Execute your workflow
const blockConfigs = [
  /* your block configs */
];
const results = await engine.executeWorkflow(blockConfigs);