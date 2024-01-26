import "@/styles/globals.css";
import type { AppProps } from "next/app"
import Head from "next/head";
import Navbar from '@/components/modules/Navbar';
import Footer from "@/components/modules/Footer";
import { Inter } from 'next/font/google'
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
  <Head>
  <link rel="icon" type="image/png" href="https://seeklogo.com/images/A/amiri-logo-0A19AA90E1-seeklogo.com.png"/>
  <meta name="theme-color" content="#ffffff"/>
  </Head>

  <main className={inter.className}>
  <QueryClientProvider client={queryClient}>
  <Navbar/>
  <div className="mt-[3.5rem]">
  <Component {...pageProps} />
  </div>
  <Footer/>
  </QueryClientProvider>
  </main>
  </>  
  )
}
