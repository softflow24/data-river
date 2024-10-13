import { useSelector } from "react-redux";
import { ReactFlowState, RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

// Create a memoized selector for the entire ReactFlowState
const selectReactFlowState = (state: RootState) => state.reactFlow;

// Overload 1: No selector provided, returns entire ReactFlowState
export function useReactFlowState(): ReactFlowState;

// Overload 2: Selector provided, returns the selected part of ReactFlowState
export function useReactFlowState<T>(selector: (state: ReactFlowState) => T): T;

// Implementation
export function useReactFlowState<T>(
  selector?: (state: ReactFlowState) => T,
): ReactFlowState | T {
  // If no selector is provided, use the memoized selector for the entire state
  if (!selector) {
    return useSelector(selectReactFlowState);
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
