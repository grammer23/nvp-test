import { Metadata } from 'next';
import dynamic from 'next/dynamic'
import { useAppDispatch } from '@/hooks'
import { getBookmarksFromFirebaseDB, signIn, signOut, toggleDarkChange } from '@/libs/features'
import { useCallback, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';

export const metadata: Metadata = {
  title: 'NVP Test',
  description: 'NVP interview test using Next js & Ionic React'
}

const App = dynamic(() => import('@/components/app-shell'), {
  ssr: false,
});

export default function Home() {
  const dispatch = useAppDispatch()

  const toggleDarkTheme = useCallback((shouldAdd: boolean) => {
    dispatch(toggleDarkChange())
    document.body.classList.toggle('dark', shouldAdd);
  }, [dispatch])

  const initializeDarkTheme = useCallback((isDark: boolean) => {
    dispatch(toggleDarkChange())
    toggleDarkTheme(isDark)
  }, [dispatch, toggleDarkTheme])

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    initializeDarkTheme(prefersDark.matches);

    prefersDark.addEventListener('change', (mediaQuery) => initializeDarkTheme(mediaQuery.matches));

  }, [initializeDarkTheme])

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if(userAuth) {
        dispatch(signIn(userAuth))
      } else {
        dispatch(signOut())
      }
    })
  }, [dispatch])

  useEffect(() => {
    dispatch(getBookmarksFromFirebaseDB());
  }, [dispatch])
  return (
    <App />
  );
}
