import * as React from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { Button } from '@/components/atoms'
import { signIn, signOut } from '@/libs/features'
import { auth } from '@/config/firebase'

/**
 * Represents an authentication button component.
 */
export const AuthButton = () => {
  const provider = new GoogleAuthProvider()

  // Selects user state from the Redux store
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  /**
   * Handles user login.
   */
  const login = () => {
    provider.setCustomParameters({ prompt: "select_account" })

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        
        dispatch(signIn(user))
    })
  }

  /**
   * Handles user logout.
   */
  const logout = () => {
    auth.signOut()
    .then(() => {
      dispatch(signOut())
    })
  }

  return (
    <Button variant="default" className='bg-blue-500' onClick={() => {
      if(!user.user)
        login()
      else
        logout()
    }}>
      Sign { !user.user ? 'In' : 'Out' }
    </Button>
  )
}
