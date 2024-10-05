import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LayoutState {
  isBottomPanelDragging: boolean;
  isBottomPanelHovered: boolean;
  bottomPanelSize: number;
  isBottomPanelVisible: boolean;
  isRightPanelVisible: boolean;
  isLeftPanelVisible: boolean;
}

const initialState: LayoutState = {
  isBottomPanelDragging: false,
  isBottomPanelHovered: false,
  bottomPanelSize: 0,
  isBottomPanelVisible: false,
  isRightPanelVisible: false,
  isLeftPanelVisible: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setIsBottomPanelDragging: (state, action: PayloadAction<boolean>) => {
      state.isBottomPanelDragging = action.payload;
    },
    setIsBottomPanelHovered: (state, action: PayloadAction<boolean>) => {
      state.isBottomPanelHovered = action.payload;
    },
    setBottomPanelSize: (state, action: PayloadAction<number>) => {
      state.bottomPanelSize = action.payload;
    },
    setIsBottomPanelVisible: (state, action: PayloadAction<boolean>) => {
      state.isBottomPanelVisible = action.payload;
    },
    toggleBottomPanelVisible: (state) => {
      state.isBottomPanelVisible = !state.isBottomPanelVisible;
    },
    setIsRightSidebarVisible: (state, action: PayloadAction<boolean>) => {
      state.isRightPanelVisible = action.payload;
    },
    toggleRightPanelVisible: (state) => {
      state.isRightPanelVisible = !state.isRightPanelVisible;
    },
    setLeftPanelVisible: (state, action: PayloadAction<boolean>) => {
      state.isLeftPanelVisible = action.payload;
    },
    toggleLeftPanelVisible: (state) => {
      state.isLeftPanelVisible = !state.isLeftPanelVisible;
    },
  },
});

export const {
  setIsBottomPanelDragging,
  setIsBottomPanelHovered,
  setBottomPanelSize,
  setIsBottomPanelVisible,
  toggleBottomPanelVisible,
  setIsRightSidebarVisible,
  toggleRightPanelVisible,
  setLeftPanelVisible,
  toggleLeftPanelVisible,
} = layoutSlice.actions;

export default layoutSlice.reducer;
