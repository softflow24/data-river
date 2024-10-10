import { useSelector } from "react-redux";
import { ReactFlowState, RootState } from "@/store";

// Overload 1: No selector provided, returns entire ReactFlowState
export function useReactFlowState(): ReactFlowState;

// Overload 2: Selector provided, returns the selected part of ReactFlowState
export function useReactFlowState<T>(selector: (state: ReactFlowState) => T): T;

// Implementation
export function useReactFlowState<T>(
  selector?: (state: ReactFlowState) => T,
): ReactFlowState | T {
  return useSelector((state: RootState) => {
    const reactFlow = state.reactFlow;
    return selector ? selector(reactFlow) : reactFlow;
  });
}

export default useReactFlowState;
