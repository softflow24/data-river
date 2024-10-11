import { configureStore } from "@reduxjs/toolkit";
import reactFlowReducer from "./slices/reactFlowSlice";
import executionReducer from "./slices/executionSlice";
import layoutReducer from "./slices/layoutSlice";
import editorReducer, { EditorState } from "./slices/editorSlice";

const store = configureStore({
  reducer: {
    reactFlow: reactFlowReducer,
    execution: executionReducer,
    layout: layoutReducer,
    editor: editorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Add this line to export EditorState
export type { EditorState };

export default store;

// Re-export actions from slices
export * from "./slices/reactFlowSlice";
export * from "./slices/executionSlice";
export * from "./slices/layoutSlice";
export * from "./slices/editorSlice";
