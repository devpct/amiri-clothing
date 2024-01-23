import "@/styles/globals.css";
import type { AppProps } from "next/app"
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
  <Head>
  <link rel="icon" type="image/png" href="https://seeklogo.com/images/A/amiri-logo-0A19AA90E1-seeklogo.com.png"/>
  <meta name="theme-color" content="#ffffff"/>
  </Head>
  <Component {...pageProps} />
  </>  
  )
}
