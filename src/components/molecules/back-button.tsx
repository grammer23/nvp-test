import { IonBackButton, IonButtons } from "@ionic/react";

/**
 * Represents a back button component.
 * @param href - The URL to navigate to when the button is clicked.
 */
export const BackButton = ({ href }: { href: string }) => (
  <IonButtons slot="start" className="ion-padding-start">
    <IonBackButton defaultHref={href} />
  </IonButtons>
)