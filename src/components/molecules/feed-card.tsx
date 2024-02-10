import { IonImg, IonIcon, IonButton } from '@ionic/react'
import { bookmarkOutline, bookmarkSharp } from 'ionicons/icons'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/atoms'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { EmployeeThunkProp, addEmployeeToBookmarkedDB, removeEmployeeFromBookmark } from '@/libs/features'
import toast from 'react-hot-toast'
import { differenceInYears, parse } from 'date-fns'

/**
 * Represents a feed card component displaying basic user information.
 * @param user - The user object containing details to display.
 */
export const FeedCard = ({ user }: { user: EmployeeThunkProp}) => {
  const [exists, setExists] = useState<boolean>(false)
  const userState = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const handleAddToBookmark = (employee: EmployeeThunkProp) => {
    try {
      if (userState.user) {
        toast.success('Success added to bookmark')
        dispatch(addEmployeeToBookmarkedDB(employee));
      }
    } catch (error) {
      toast.error('error' + error)
    }
  };

  const handleRemoveEmployeeFromBookmark = (id: number) => {
    if (userState.user) {
      toast.success('Success remove to bookmark')
      dispatch(removeEmployeeFromBookmark(id));
    }
  };

  useEffect(() => {
    const bookmarkCollection = collection(db, `${userState.user?.uid}`)
    getDocs(bookmarkCollection)
      .then((snapshot) => {
        const bookmarkList = snapshot.docs.map((doc) => doc.data());
        const itemExists = bookmarkList.some((item) => item.id === user.id);
        setExists(itemExists)
      })
  }, [user.id, userState.user?.uid])

  const getAge = (dob: string) => {
    const date = parse(dob, "yyyy-MM-dd", new Date());
    const age = differenceInYears(new Date(), date);
    return age;
  }

  return (
    <Card className='mt-10'>
      <CardHeader>
        <IonImg src={user.image} className='w-1/5 lg:w-1/12' />
        <div className="flex flex-row justify-between items-center">
          <CardTitle className='lg:text-xl text-base'>{user.firstName} {" "} {user.lastName} - {getAge(user.birthDate)} ({getAge(user.birthDate) + 10} in {new Date().getFullYear() + 10} years)</CardTitle>
          <IonIcon 
            icon={exists ? bookmarkSharp : bookmarkOutline} 
            className='cursor-pointer' 
            size='large'
            onClick={() => {
              if(userState.user) {
                if(exists) {
                  setExists(false)
                  handleRemoveEmployeeFromBookmark(user.id)
                } else {
                  setExists(true)
                  handleAddToBookmark(user)
                }
              } else {
                toast.error('Please sign in first')
              }
            }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <IonButton routerLink={`/tabs/detail/${user.id}`}>See Detail</IonButton>
      </CardContent>
    </Card>
  )
}
