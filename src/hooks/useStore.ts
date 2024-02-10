import { useDispatch, useSelector, useStore } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch, AppStore } from '@/libs'

/**
 * Custom hook for accessing the Redux dispatch function typed with the application's dispatch type.
 */
export const useAppDispatch: () => AppDispatch = useDispatch

/**
 * Typed hook for selecting data from the Redux store, providing access to the application's root state.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

/**
 * Custom hook for accessing the Redux store instance typed with the application's store type.
 */
export const useAppStore: () => AppStore = useStore
