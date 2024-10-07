import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISharedBlock } from "@data-river/shared/interfaces/ISharedBlock";
import { BlockMapperService } from "../services/BlockMapperService";
import { Node } from "reactflow";
import { IExecutionResult } from "@data-river/shared/interfaces/IExecutionResult";
import { LogEntry, LogLevel } from "@data-river/shared/interfaces/LogEntry";

export interface ExecutionState {
  executionBlocks: ISharedBlock[];
  isExecuting: boolean;
  executionResult: IExecutionResult;
  logs: LogEntry[];
  filterLevel: LogLevel;
}

const initialState: ExecutionState = {
  executionBlocks: [],
  isExecuting: false,
  executionResult: {
    result: [],
    errors: [],
  },
  logs: [],
  filterLevel: "info",
};

const executionSlice = createSlice({
  name: "execution",
  initialState,
  reducers: {
    setExecutionBlocks: (state, action: PayloadAction<ISharedBlock[]>) => {
      state.executionBlocks = action.payload;
    },
    updateExecutionBlock: (state, action: PayloadAction<ISharedBlock>) => {
      const index = state.executionBlocks.findIndex(
        (block) => block.id === action.payload.id,
      );
      if (index !== -1) {
        state.executionBlocks[index] = action.payload;
      }
    },
    updateExecutionBlockInputs: (
      state,
      action: PayloadAction<{ id: string; inputs: Record<string, any> }>,
    ) => {
      const index = state.executionBlocks.findIndex(
        (block) => block.id === action.payload.id,
      );
      if (index !== -1) {
        state.executionBlocks[index].data.inputs = action.payload.inputs;
      }
    },
    setIsExecuting: (state, action: PayloadAction<boolean>) => {
      state.isExecuting = action.payload;
    },
    setExecutionResult: (state, action: PayloadAction<IExecutionResult>) => {
      state.executionResult = action.payload;
    },
    syncBlocksWithNodes: (state, action: PayloadAction<Node[]>) => {
      const blockMapper = new BlockMapperService();
      state.executionBlocks = action.payload.map((node) =>
        blockMapper.mapReactFlowNodeToBlock(node),
      );
    },
    addLog: (state, action: PayloadAction<LogEntry>) => {
      // Serialize the error object if it exists
      const serializedLog = {
        ...action.payload,
        data: action.payload.data
          ? serializeError(action.payload.data)
          : undefined,
      };
      state.logs.push(serializedLog);
    },
    clearLogs: (state) => {
      state.logs = [];
    },
    setFilterLevel: (state, action: PayloadAction<LogLevel>) => {
      state.filterLevel = action.payload;
    },
  },
});

// Helper function to serialize error objects
function serializeError(err: any): any {
  if (err instanceof Error) {
    return {
      name: err.name,
      message: err.message,
      stack: err.stack,
      // Add any custom properties from BlockValidationError
      ...(err as any),
    };
  } else if (typeof err === "object" && err !== null) {
    // For other objects, we'll create a new object with enumerable properties
    return Object.keys(err).reduce((acc, key) => {
      acc[key] = err[key];
      return acc;
    }, {} as any);
  }
  return err;
}

export const {
  setExecutionBlocks,
  updateExecutionBlock,
  updateExecutionBlockInputs,
  setIsExecuting,
  setExecutionResult,
  syncBlocksWithNodes,
  addLog,
  clearLogs,
  setFilterLevel,
} = executionSlice.actions;

export default executionSlice.reducer;
