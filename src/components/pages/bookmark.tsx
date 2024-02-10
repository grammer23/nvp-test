import { useAppSelector } from "@/hooks";
import { MainLayout } from '@/components/templates/main-layout'
import { FeedCard } from '@/components/molecules'
import { IonText } from "@ionic/react";

/**
 * Represents the Bookmark page component.
 */
export default function Bookmark() {
  // Retrieves bookmarked employees from the Redux store
  const bookmarkedEmployees = useAppSelector((state) => state.bookmark.bookmarked);

  return (
    <MainLayout 
      title="NVP Interview Test | Bookmark" 
    >
      <div className="flex flex-col justify-center">
        {bookmarkedEmployees.length === 0
          ? (
            <IonText color="primary">
              <h1>Sorry no bookmark</h1>
            </IonText>
          )
          : bookmarkedEmployees && bookmarkedEmployees.map((user, i) => <FeedCard key={i} user={user} />)
        }
      </div>
    </MainLayout>
  )
}
