import { 
  IonHeader, 
  IonTitle, 
  IonToolbar 
} from "@ionic/react"
import { ThemeToggle } from '@/components/molecules'

/**
 * Props for the Header component.
 */
type HeaderProps = {
  /** The title to display in the header. */
  title: string;
  /** Optional content to display at the start of the header. */
  slotStart?: React.ReactNode;
}

/**
 * Represents a header component with a title and optional content.
 * @param title - The title to display in the header.
 * @param slotStart - Optional content to display at the start of the header.
 */
export const Header = ({ title, slotStart }: HeaderProps) => {
  return (
    <IonHeader>
      <IonToolbar>
        {slotStart && slotStart}
        <IonTitle>{title}</IonTitle>
        <ThemeToggle />
      </IonToolbar>
    </IonHeader>
  )
}
