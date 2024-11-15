import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark" | "system";
export type Locale = string;

interface SettingsState {
  theme: Theme;
  locale: Locale;
}

const initialState: SettingsState = {
  theme: "system",
  locale: "en-US",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setLocale: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    },
    initializeSettings: (
      state,
      action: PayloadAction<Partial<SettingsState>>,
    ) => {
      return { ...state, ...action.payload };
    },
  },
});
