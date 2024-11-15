import { configureStore } from "@reduxjs/toolkit";
import { settingsSlice } from "./settings/settings.slice";

export const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
