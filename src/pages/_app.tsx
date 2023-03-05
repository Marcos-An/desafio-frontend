import React from 'react'
import '@/styles/globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { Header } from '@components/organisms/Header'
import { store } from '@redux/store'
import type { AppProps } from 'next/app'
import { Noto_Sans } from 'next/font/google'
import { Provider } from 'react-redux'
import { SkeletonTheme } from 'react-loading-skeleton'

const noto = Noto_Sans({ subsets: ['latin'], weight: ['400', '700', '300'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <main className={noto.className}>
          <Header />
          <Component {...pageProps} />
        </main>
      </SkeletonTheme>
    </Provider>
  )
}
