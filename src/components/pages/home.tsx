import { useEffect, useState } from 'react'
import { IonInfiniteScroll, IonInfiniteScrollContent, IonSpinner } from '@ionic/react'
import { MainLayout } from '@/components/templates/main-layout'
import { auth } from '@/config/firebase'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { IonText } from '@ionic/react'
import { AuthButton } from '@/components/molecules'
import { useGetUsersQuery } from '@/services/usersService'
import { FeedCard } from '@/components/molecules'
import { getBookmarksFromFirebaseDB } from '@/libs/features'

/**
 * Represents the Home page component.
 */
export default function Home() {
  // Retrieves user state from the Redux store
  const user = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()

  // State to manage the limit of users fetched
  const [limit, setLimit] = useState<number>(10)
  
  // Fetches a list of users based on the specified limit
  const { isLoading, data: users, refetch } = useGetUsersQuery(limit)

  return (
    <MainLayout title='NVP Interview Test | Home'>
      <IonText color="primary">
          <h1>List Employees</h1>
          {user.user
            ? 
              <p className='text-lg my-4'>Welcome back {auth.currentUser?.displayName}</p> 
            : 
              null
          }
      </IonText>
      <AuthButton />
      {isLoading 
        ? <IonSpinner /> 
        : users && users?.users.map((user, i) => <FeedCard key={i} user={user} />)}
      <IonInfiniteScroll onIonInfinite={(ev) => {
        setLimit(limit + 10)
        refetch()
        setTimeout(() => ev.target.complete(), 500)
      }}>
        <IonInfiniteScrollContent />
      </IonInfiniteScroll>
    </MainLayout>
  )
}
