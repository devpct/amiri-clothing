import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "@/components/modules/Navbar";
import Footer from "@/components/modules/Footer";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pageTitles from "@/pageTitles";
import { Provider } from "react-redux";
import store from "@/redux/store";
import ShoppingCarts from "@/components/modules/ShoppingCarts";
import Theme from "@/components/modules/ButtonTheme";
import React, { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps, router }: AppProps) => {
  const isLoginPage = router.pathname === "/login";
  const isSignupPage = router.pathname === "/signup";
  const isDashboard = router.pathname.startsWith("/dashboard/");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("darkMode") === "true"; 
    setDarkMode(currentTheme);
  }, []);

  // Find the page name based on the current route
  const currentPage = pageTitles.find((page) => page.route === router.pathname);
  const title = currentPage?.title;

  return (
    <>
      <Head>
        <title>{`AMIRI - ${title}`}</title>
        <link
          rel="icon"
          type="image/png"
          href="https://seeklogo.com/images/A/amiri-logo-0A19AA90E1-seeklogo.com.png"
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <Provider store={store}>
        <main className={inter.className}>
          <QueryClientProvider client={new QueryClient()}>
            <div className={`${darkMode ? "dark" : ""}`}>
              {!isLoginPage && !isSignupPage && !isDashboard && <Navbar />}
              <Component {...pageProps} />
              {!isLoginPage && !isSignupPage && !isDashboard && <Footer />}
              <ToastContainer />
              <ShoppingCarts />
              {!isLoginPage && !isSignupPage && <Theme darkMode={darkMode}/>}
            </div>
          </QueryClientProvider>
        </main>
      </Provider>
    </>
  );
};

export default App;
