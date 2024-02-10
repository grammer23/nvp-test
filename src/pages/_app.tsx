import "@/styles/globals.css";
import "@/styles/theme/ionic/main.css"
import "@/styles/theme/ionic/variables.css"
import type { AppProps } from "next/app";
import { setupIonicReact } from '@ionic/react'
import { Provider } from 'react-redux'
import { setupStore, AppStore } from '@/libs'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import Head from "next/head";
import Script from 'next/script'

import { Plus_Jakarta_Sans } from 'next/font/google'
import { cn } from "@/libs";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";

const pjs = Plus_Jakarta_Sans({ preload: false })

setupIonicReact({})

export default function App({ Component, pageProps }: AppProps) {
  const storeRef = useRef<AppStore>()

  if(!storeRef.current)
    storeRef.current = setupStore()

  return (
    <>
      <Head>
        <title>NVP Test</title>
      </Head>
      <Provider store={storeRef.current}>
        <Toaster />
        <main className={pjs.className} suppressHydrationWarning>
          <Component {...pageProps} />
        </main>
      </Provider>
      <Script
        type="module"
        src="https://unpkg.com/ionicons@5.2.3/dist/ionicons/ionicons.esm.js"
      ></Script>
      <Script noModule={true} src="https://unpkg.com/ionicons@5.2.3/dist/ionicons/ionicons.js"></Script>
    </>
  )
}
