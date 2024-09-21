import { container } from "tsyringe";
import WebSocket from "ws";

import { BrowserExecutionStrategy } from "../../strategies/BrowserExecutionStrategy";
import { IExecutionStrategy } from "../../strategies/IExecutionStrategy";
import { ServerExecutionStrategy } from "../../strategies/ServerExecutionStrategy";

export function configureDI(isServer: boolean, wss?: WebSocket.Server) {
  if (isServer) {
    container.register<IExecutionStrategy>("ExecutionStrategy", {
      useClass: ServerExecutionStrategy,
    });
    container.register<() => WebSocket.Server | undefined>(
      "WebSocketServerFactory",
      {
        useFactory: () => () => wss,
      },
    );
  } else {
    container.register<IExecutionStrategy>("ExecutionStrategy", {
      useClass: BrowserExecutionStrategy,
    });
  }
}

export { container };
