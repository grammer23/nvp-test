import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '@/libs'
import {
  setDoc,
  deleteDoc,
  collection,
  getDoc,
  doc,
  getDocs,
  Firestore
} from 'firebase/firestore'
import { auth, db } from '@/config/firebase'
import { 
  addBookmarkFail,
  addEmployeeToBookmarked,
  getBookmarkError,
  removeEmployeeFromBookmarked,
  updateBookmarks,
  EmployeeThunkProp
} from '@/libs/features/bookmark/bookmarkSlice'
import { useIonToast } from '@ionic/react'

/**
 * Hook to display IonToast notifications.
 * @param message - The message to display.
 * @returns A function to present the IonToast notification.
 */
export const useNotify = (message: string) => {
  const [present] = useIonToast()
  return present({
    message,
    duration: 1500,
    position: 'bottom'
  })
}

/**
 * Async thunk to add an employee to the bookmarked list.
 */
export const addEmployeeToBookmarkedDB = createAsyncThunk('bookmark/addEmployeeToBookmarked', async(employee: EmployeeThunkProp, { dispatch, getState }) => {
  const state = getState() as RootState
  const user = state.user.user
  const employeeId = employee.id.toString()
  const { 
    address,
    age,
    birthDate,
    company,
    email,
    firstName,
    id,
    image,
    lastName,
    username
  } = employee
  
  try {
    const bookmarkItemRef = doc(db, `${user?.uid}`, employeeId)
    const docSnap = await getDoc(bookmarkItemRef)
    
    if(docSnap.exists()) {
      dispatch(
        addBookmarkFail(" already an existing item")
      );
    } else {
      await setDoc(doc(db, `${user?.uid}`, employeeId), {
        address,
        age,
        birthDate,
        company,
        email,
        firstName,
        id,
        image,
        lastName,
        username
      })
      dispatch(addEmployeeToBookmarked(employee))
    }
  }catch(error: any) {
    dispatch(
      addBookmarkFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : "Failed to add " + username + ": " + error.message
      )
    );
  }
})

/**
 * Async thunk to remove an employee from the bookmarked list.
 */
export const removeEmployeeFromBookmark = createAsyncThunk(
  "bookmark/removeEmployeeFromBookmarked",
  async (id: number, { dispatch, getState }) => {
    const state = getState() as RootState;
    const user = state.user.user;
    const employeeId = id.toString();
    try {
      dispatch(removeEmployeeFromBookmarked(id));
      await deleteDoc(doc(db, `${user?.uid as string}`, employeeId));
    } catch (error: any) {
      dispatch({
        type: "ADD_BOOKMARK_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
);

/**
 * Async thunk to retrieve bookmarks from the Firebase database.
 */
export const getBookmarksFromFirebaseDB = createAsyncThunk(
  "bookmark/getBookmarksFromFirebaseDB",
  async (_, { dispatch }) => {
    if(!auth) return
    const getBookmarkItems = async (db: Firestore) => {
      const bookmarkCol = collection(db, `${auth.currentUser?.uid as string}`);
      const bookmarkSnapshot = await getDocs(bookmarkCol);
      const bookmarkList = bookmarkSnapshot.docs.map(
        (doc) => doc.data() as EmployeeThunkProp
      );
      return bookmarkList;
    };
    try {
      let allBookmarks = await getBookmarkItems(db);
      dispatch(updateBookmarks(allBookmarks));
    } catch (error: any) {
      dispatch(
        getBookmarkError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  }
);
