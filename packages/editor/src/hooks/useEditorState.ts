import { useSelector } from "react-redux";
import { EditorState, RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

// Create a memoized selector for the entire EditorState
const selectEditorState = (state: RootState) => state.editor;

// Overload 1: No selector provided, returns entire EditorState
export function useEditorState(): EditorState;

// Overload 2: Selector provided, returns the selected part of EditorState
export function useEditorState<T>(selector: (state: EditorState) => T): T;

// Implementation
export function useEditorState<T>(
  selector?: (state: EditorState) => T,
): EditorState | T {
  // If no selector is provided, use the memoized selector for the entire state
  if (!selector) {
    return useSelector(selectEditorState);
  }

  // Create a memoized selector for the specific selection
  const memoizedSelector = createSelector([selectEditorState], (editorState) =>
    selector(editorState),
  );

  // Use the memoized selector
  return useSelector(memoizedSelector);
}

export default useEditorState;
