import { IonToggle, ToggleChangeEventDetail } from "@ionic/react"
import { useAppSelector, useAppDispatch } from '@/hooks'
import { toggleDarkChange, toggleChange as toggleDefault } from '@/libs/features'
import { useCallback } from "react"

/**
 * Represents a theme toggle component allowing users to switch between light and dark themes.
 */
export const ThemeToggle = () => {
  // Retrieves theme state from the Redux store
  const theme = useAppSelector((state) => state.theme.value)
  const dispatch = useAppDispatch()

  /**
   * Toggles the dark theme based on the user's preference.
   * @param shouldAdd - Indicates whether to add or remove the 'dark' class from the body.
   */
  const toggleDarkTheme = useCallback((shouldAdd: boolean) => {
    dispatch(toggleDarkChange())
    document.body.classList.toggle('dark', shouldAdd);
  }, [dispatch])

  /**
   * Handles the change event of the toggle.
   * @param ev - The toggle change event.
   */
  const toggleChange = (ev: CustomEvent<ToggleChangeEventDetail>) => {
    dispatch(toggleDefault())
    toggleDarkTheme(ev.detail.checked)
  }

  return (
    <IonToggle slot='end' className='ion-padding-end' checked={theme} onIonChange={toggleChange}>Dark Mode</IonToggle>
  )
}
