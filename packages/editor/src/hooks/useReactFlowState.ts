import { useSelector } from "react-redux";
import { ReactFlowState, RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

// Create a memoized selector for the entire ReactFlowState
const selectReactFlowState = (state: RootState) => state.reactFlow;

export function useReactFlowState<T>(selector: (state: ReactFlowState) => T): T;

export function useReactFlowState<T>(
  selector: (state: ReactFlowState) => T,
): ReactFlowState | T {
  if (typeof selector !== "function") {
    throw new Error("Selector must be a function");
  }

  // Create a memoized selector for the specific selection
  const memoizedSelector = createSelector(
    [selectReactFlowState],
    (reactFlowState) => selector(reactFlowState),
  );

  // Use the memoized selector
  return useSelector(memoizedSelector);
}

export default useReactFlowState;
