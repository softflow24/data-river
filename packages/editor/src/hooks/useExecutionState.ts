import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ExecutionState } from "@/slices/executionSlice";

// Overload 1: No selector provided, returns entire ExecutionState
export function useExecutionState(): ExecutionState;

// Overload 2: Selector provided, returns the selected part of ExecutionState
export function useExecutionState<T>(selector: (state: ExecutionState) => T): T;

// Implementation
export function useExecutionState<T>(
  selector?: (state: ExecutionState) => T,
): ExecutionState | T {
  return useSelector((state: RootState) => {
    const execution = state.execution;
    return selector ? selector(execution) : execution;
  });
}

export default useExecutionState;
