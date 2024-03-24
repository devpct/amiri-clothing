import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import {localhostDatabase} from '@/localhost';

export default function Sidebar({ isOpen, setIsOpen}) {
  
  const router = useRouter();
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  const { data: ordersData } = useSWR('Orders', () =>
  axios.get(`${localhostDatabase}/order`).then((res) => res.data)
  );

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
      const storedDarkMode = localStorage.getItem("darkMode");
      if (storedDarkMode) {
          setDarkMode(storedDarkMode === "true");
      }
  }, []);

  return (
    <>
    <div
        id="docs-sidebar"
        className={` lg:mt-20 mt-[63px] hs-overlay z-50 transition-all duration-300 transform  fixed top-0 start-0 bottom-0  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 ${
          isOpen ? '-translate-x-0 w-full' : '-translate-x-full'
        }`}
      >
        <div className={`bg-white dark:bg-gray-900 w-64 border-e dark:border-gray-500 h-screen border-gray-200 pt-7 pb-10 z-60  ${isOpen ? 'w-[60%]': null}`}>
          <div className="px-6">
            <p className="flex-none text-xl font-semibold dark:text-white">Admin Panel</p>
          </div>
          <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
            <ul className="space-y-1.5">
              <li>
                <Link  className={`flex items-center gap-x-3.5 py-2 px-2.5  text-sm text-slate-700 rounded-lg   dark:focus:outline-none dark:focus:ring-1  ${router.pathname === '/dashboard/admin/assessment' ? 'bg-gray-900 text-white dark:bg-white dark:text-black' : 'hover:bg-gray-100 dark:text-white dark:hover:text-black'}`} href="assessment">
                  <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  Assessment
                </Link>
              </li>

              <li>
              <button
                className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg  ${
                  router.pathname === '/dashboard/admin/users' ? 'bg-gray-900 text-white dark:bg-white dark:text-black' : 'hover:bg-gray-100 dark:text-white dark:hover:text-black'
                }`}
                onClick={() => router.push('/dashboard/admin/users')}
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Users
              </button>
            </li>

            <li>
              <button
                className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg  ${
                  router.pathname === '/dashboard/admin/products' ? 'bg-gray-900 text-white dark:bg-white dark:text-black' : 'hover:bg-gray-100 dark:text-white dark:hover:text-black'
                }`}
                onClick={() => router.push('/dashboard/admin/products')}
              >
              <svg className="size-4" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="m16.5 9.4-9-5.19"></path>
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <path d="M3.27 6.96 12 12.01l8.73-5.05"></path>
                <path d="M12 22.08V12"></path>
              </svg>
                Products
              </button>
            </li>

            <li>
              <button
                className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg  ${
                  router.pathname === '/dashboard/admin/categories' ? 'bg-gray-900 text-white dark:bg-white dark:text-black' : 'hover:bg-gray-100 dark:text-white dark:hover:text-black'
                }`}
                onClick={() => router.push('/dashboard/admin/categories')}
              >
              <svg className="size-4" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 10H3"></path>
              <path d="M21 6H3"></path>
              <path d="M21 14H3"></path>
              <path d="M17 18H3"></path>
            </svg>
              Categories
              </button>
            </li>


            <li>
              <button
                className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg  ${
                  router.pathname === '/dashboard/admin/comments' ? 'bg-gray-900 text-white dark:bg-white dark:text-black' : 'hover:bg-gray-100 dark:text-white dark:hover:text-black'
                }`}
                onClick={() => router.push('/dashboard/admin/comments')}
              >
                <svg className="size-4" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              Comments
              </button>
            </li>

            <li>
              <button
                className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg  ${
                  router.pathname === '/dashboard/admin/sliders' ? 'bg-gray-900 text-white dark:bg-white dark:text-black' : 'hover:bg-gray-100 dark:text-white dark:hover:text-black'
                }`}
                onClick={() => router.push('/dashboard/admin/sliders')}
              >
                <svg className="size-4" width="24" height="24" fill="none" stroke="currentColor"  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>
                </svg>
                Sliders
              </button>
            </li>

            <li>
              <button
                className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg  ${
                  router.pathname === '/dashboard/admin/cart' ? 'bg-gray-900 text-white dark:bg-white dark:text-black' : 'hover:bg-gray-100 dark:text-white dark:hover:text-black'
                }`}
                onClick={() => router.push('/dashboard/admin/cart')}
              >
                <svg className="size-4" width="24" height="24" fill="none" stroke="currentColor"stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z"></path>
                  <path d="M20 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z"></path>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Cart
              </button>
            </li>

            <li>
              <button
                className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg  ${
                  router.pathname === '/dashboard/admin/orders' ? 'bg-gray-900 text-white dark:bg-white dark:text-black' : 'hover:bg-gray-100 dark:text-white dark:hover:text-black'
                }`}
                onClick={() => router.push('/dashboard/admin/orders')}
              >
              <svg className="size-4" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
                Orders
                { ordersData?.filter(order => order.status === 'preparing').length !== 0 ?
                  <div className={`grid ml-auto w-6 h-6 rounded-full ${
                    router.pathname === '/dashboard/admin/orders' ? 'bg-gray-900 text-white dark:bg-white dark:text-black' : 'hover:bg-gray-100 dark:text-white dark:hover:text-black'
                  }`}><p className='m-auto'>{ordersData?.filter(order => order.status === 'preparing').length}</p></div>
                  : null
                }
              </button>
            </li>
        </ul>
    </nav>
    </div>
    {isOpen && (
    <div 
        className="fixed top-0 right-0 w-[40%] h-screen bg-black opacity-50 z-50" 
        onClick={closeMenu}
    ></div>
    )}
    </div>
    </>
  )
}
