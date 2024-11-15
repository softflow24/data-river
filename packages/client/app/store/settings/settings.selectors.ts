import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const selectSettingsState = (state: RootState) => state.settings;

export const selectTheme = createSelector(
  selectSettingsState,
  (settings) => settings.theme,
);

export const selectLocale = createSelector(
  selectSettingsState,
  (settings) => settings.locale,
);
