import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/libs'

/**
 * Represents the state structure for theme-related data in Redux.
 */
type ThemeState = { value: boolean };

/**
 * Initial state for the theme slice.
 */
const initialState: ThemeState = {
  value: false
};

/**
 * Redux slice responsible for managing theme-related actions and state.
 */
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    /**
     * Action creator for toggling the theme to the default state.
     * @param state - The current theme state.
     */
    toggleChange: (state) => {
      state.value = false;
    },
    /**
     * Action creator for toggling the theme to the dark mode state.
     * @param state - The current theme state.
     */
    toggleDarkChange: (state) => {
      state.value = true;
    }
  }
});

/**
 * Action creators generated by the theme slice.
 */
export const { toggleChange, toggleDarkChange } = themeSlice.actions;

/**
 * Selects the theme value from the root state.
 * @param state - The root state of the application.
 * @returns The theme value.
 */
export const selectTheme = (state: RootState) => state.theme.value;

/**
 * Reducer function for the theme slice.
 */
export default themeSlice.reducer;
