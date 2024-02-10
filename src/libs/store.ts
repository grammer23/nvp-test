import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userApi } from '@/services/usersService'
import { themeSlice, userSlice, bookmarkSlice } from '@/libs/features'

/**
 * Combines multiple reducers into a single root reducer and creates a Redux store configured with middleware.
 * @returns A Redux store instance configured with the root reducer and middleware.
 */
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware)
  });
}

/**
 * The root reducer that combines reducers from different features.
 */
const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [themeSlice.reducerPath]: themeSlice.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [bookmarkSlice.reducerPath]: bookmarkSlice.reducer
});

/**
 * The type representing the Redux store returned by setupStore.
 */
export type AppStore = ReturnType<typeof setupStore>;

/**
 * The type representing the root state of the Redux store.
 */
export type RootState = ReturnType<AppStore['getState']>;

/**
 * The type representing the dispatch function of the Redux store.
 */
export type AppDispatch = AppStore['dispatch'];