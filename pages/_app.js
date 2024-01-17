import Footer from '@/components/UI/Footer'
import Navbar from '@/components/UI/Navbar'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
    <Navbar />
    <Component {...pageProps} />
    <Footer/>
    </>
  )
}
