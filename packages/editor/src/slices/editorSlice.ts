import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EditorState {
  isPanning: boolean;
}

const initialState: EditorState = {
  isPanning: false,
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setIsPanning: (state, action: PayloadAction<boolean>) => {
      state.isPanning = action.payload;
    },
    togglePanning: (state) => {
      state.isPanning = !state.isPanning;
    },
  },
});

export const { setIsPanning, togglePanning } = editorSlice.actions;

export default editorSlice.reducer;
