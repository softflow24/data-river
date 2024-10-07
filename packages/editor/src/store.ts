import { configureStore } from "@reduxjs/toolkit";
import reactFlowReducer from "./slices/reactFlowSlice";
import executionReducer from "./slices/executionSlice";
import layoutReducer from "./slices/layoutSlice";

const store = configureStore({
  reducer: {
    reactFlow: reactFlowReducer,
    execution: executionReducer,
    layout: layoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// Re-export actions from slices
export * from "./slices/reactFlowSlice";
export * from "./slices/executionSlice";
export * from "./slices/layoutSlice";
