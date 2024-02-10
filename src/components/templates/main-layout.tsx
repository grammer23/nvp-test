import { IonContent, IonPage } from "@ionic/react";
import { Header } from '@/components/organisms'

/**
 * Represents the main layout component.
 * @param children - The children elements to be rendered inside the layout.
 * @param title - The title of the layout.
 * @param slotStart - Optional content to be displayed at the start of the header.
 */
export const MainLayout = ({ children, title, slotStart }: { children: React.ReactNode; title: string; slotStart?: React.ReactNode }) => {
  return (
    <IonPage>
      <Header title={title} slotStart={slotStart} />
      <IonContent>
        <div className='mx-4 sm:mx-8 md:mx-16 lg:mx-20 xl:mx-10 gap-6 p-10'>
          {children}
        </div>
      </IonContent>
    </IonPage>
  )
}
