import "@/styles/globals.css";
import type { AppProps } from "next/app"
import {NextUIProvider} from "@nextui-org/react";
import Head from "next/head";
import Navbar from '@/components/templates/Home/Navbar';


export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
  <NextUIProvider>
  <Head>
  <link rel="icon" type="image/png" href="https://seeklogo.com/images/A/amiri-logo-0A19AA90E1-seeklogo.com.png"/>
  <meta name="theme-color" content="#ffffff"/>
  </Head>
  <Navbar/>
  <Component {...pageProps} />
  </NextUIProvider>
  </>  
  )
}
