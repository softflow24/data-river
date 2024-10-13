import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ExecutionState } from "@/slices/executionSlice";
import { createSelector } from "@reduxjs/toolkit";

// Create a memoized selector for the entire ExecutionState
const selectExecutionState = (state: RootState) => state.execution;

// Overload 1: No selector provided, returns entire ExecutionState
export function useExecutionState(): ExecutionState;

// Overload 2: Selector provided, returns the selected part of ExecutionState
export function useExecutionState<T>(selector: (state: ExecutionState) => T): T;

// Implementation
export function useExecutionState<T>(
  selector?: (state: ExecutionState) => T,
): ExecutionState | T {
  // If no selector is provided, use the memoized selector for the entire state
  if (!selector) {
    return useSelector(selectExecutionState);
  }

  // Create a memoized selector for the specific selection
  const memoizedSelector = createSelector(
    [selectExecutionState],
    (executionState) => selector(executionState),
  );

  // Use the memoized selector
  return useSelector(memoizedSelector);
}

export default useExecutionState;
