import '@/styles/globals.css'
import { Header } from '@components/organisms/Header'
import { store } from '@redux/store'
import type { AppProps } from 'next/app'
import { Noto_Sans } from 'next/font/google'
import { Provider } from 'react-redux'

const noto = Noto_Sans({ subsets: ['latin'], weight: ['400', '700', '300'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={noto.className}>
        <Header />
        <Component {...pageProps} />
      </main>
    </Provider>
  )
}
