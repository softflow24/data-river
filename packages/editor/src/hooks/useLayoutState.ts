import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { LayoutState } from "@/slices/layoutSlice";
import { createSelector } from "@reduxjs/toolkit";

// Create a memoized selector for the entire LayoutState
const selectLayoutState = (state: RootState) => state.layout;

// Overload 1: No selector provided, returns entire LayoutState
export function useLayoutState(): LayoutState;

// Overload 2: Selector provided, returns the selected part of LayoutState
export function useLayoutState<T>(selector: (state: LayoutState) => T): T;

// Implementation
export function useLayoutState<T>(
  selector?: (state: LayoutState) => T,
): LayoutState | T {
  // If no selector is provided, use the memoized selector for the entire state
  if (!selector) {
    return useSelector(selectLayoutState);
  }

  // Create a memoized selector for the specific selection
  const memoizedSelector = createSelector([selectLayoutState], (layoutState) =>
    selector(layoutState),
  );

  // Use the memoized selector
  return useSelector(memoizedSelector);
}

export default useLayoutState;
