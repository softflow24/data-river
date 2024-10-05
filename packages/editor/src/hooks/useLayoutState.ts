import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { LayoutState } from "@/slices/layoutSlice";

// Overload 1: No selector provided, returns entire ExecutionState
export function useLayoutState(): LayoutState;

// Overload 2: Selector provided, returns the selected part of ExecutionState
export function useLayoutState<T>(selector: (state: LayoutState) => T): T;

// Implementation
export function useLayoutState<T>(
  selector?: (state: LayoutState) => T,
): LayoutState | T {
  return useSelector((state: RootState) => {
    const layout = state.layout;
    return selector ? selector(layout) : layout;
  });
}

export default useLayoutState;
