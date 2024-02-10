import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms"
import { db } from "@/config/firebase"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { EmployeeThunkProp, addEmployeeToBookmarkedDB, removeEmployeeFromBookmark } from "@/libs/features"
import { UsersResponse } from "@/types/type"
import { IonIcon, IonImg, IonSpinner } from "@ionic/react"
import { differenceInYears, parse } from "date-fns"
import { collection, getDocs } from "firebase/firestore"
import { calendar, mail, briefcase, location, bookmarkOutline, bookmarkSharp } from "ionicons/icons"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

/**
 * Represents a detailed card component displaying user information.
 * @param user - The user object containing details to display.
 */
export const DetailCard = ({ user }: { user: Pick<UsersResponse, 'users'>['users'][0] }) => {
  const [exists, setExists] = useState<boolean>(false)
  const [loadingBookmark, setLoadingBookmark] = useState<boolean>(true)
  const userState = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const handleAddToBookmark = (employee: EmployeeThunkProp) => {
    try {
      if (userState.user) {
        toast.success('Success added to bookmark')
        dispatch(addEmployeeToBookmarkedDB(employee));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveEmployeeFromBookmark = (id: number) => {
    if (userState.user) {
      toast.success('Success remove to bookmark')
      dispatch(removeEmployeeFromBookmark(id));
    }
  };

  useEffect(() => {
    setLoadingBookmark(true)
    const bookmarkCollection = collection(db, `${userState.user?.uid}`)
    getDocs(bookmarkCollection)
      .then((snapshot) => {
        const bookmarkList = snapshot.docs.map((doc) => doc.data());
        const itemExists = bookmarkList.some((item) => item.id === user.id);
        setExists(itemExists)
      })
    setLoadingBookmark(false)
  }, [user.id, userState.user?.uid])

  const getAge = (dob: string) => {
    const date = parse(dob, "yyyy-MM-dd", new Date());
    const age = differenceInYears(new Date(), date);
    return age;
  }
  return (
    <Card>
      <div className="flex flex-row justify-end ion-padding-end ion-padding-top">
      {loadingBookmark 
        ? <IonSpinner />
        : (
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
        )
      }
      </div>
      <CardHeader className="items-center gap-4">
        <IonImg src={user?.image} className='w-1/2' />
        <CardTitle>{user?.firstName} {" "} {user?.lastName}</CardTitle>
        <CardDescription>u/{user?.username} - {getAge(user.birthDate)} ({getAge(user.birthDate) + 10} in {new Date().getFullYear() + 10} years)</CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <div className="flex flex-row items-center gap-2">
          <IonIcon icon={calendar} />
          <p className="text-lg">Birth Date: {user?.birthDate}</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <IonIcon icon={mail} />
          <p className="text-lg">Email: {user?.email}</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <IonIcon icon={location} />
          <p className="text-lg">City: {user?.address.city}</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <IonIcon icon={briefcase} />
          <p className="text-lg">Company: {user?.company.name}</p>
        </div>
      </CardContent>
    </Card>
  )
}
