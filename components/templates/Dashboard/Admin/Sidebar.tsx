import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function Sidebar({ isOpen, setIsOpen}) {

  const router = useRouter();

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
 <div
        id="docs-sidebar"
        className={`lg:mt-20 mt-[63px] hs-overlay z-50 transition-all duration-300 transform  fixed top-0 start-0 bottom-0  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 ${
          isOpen ? '-translate-x-0 w-full' : '-translate-x-full'
        }`}
      >
        <div className={`w-64 border-e h-screen border-gray-200 pt-7 pb-10 z-60 bg-white  ${isOpen ? 'w-[60%]': null}`}>
          <div className="px-6">
            <p className="flex-none text-xl font-semibold dark:text-white">Admin Panel</p>
          </div>
          <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
            <ul className="space-y-1.5">
              <li>
                <Link  className={`flex items-center gap-x-3.5 py-2 px-2.5  text-sm text-slate-700 rounded-lg  dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 ${router.pathname === '/dashboard/admin/assessment' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`} href="assessment">
                  <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  Assessment
                </Link>
              </li>

              <li>
              <button
                className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg  ${
                  router.pathname === '/dashboard/admin/users' ? 'bg-gray-900 text-white ' : 'hover:bg-gray-100'
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
                  router.pathname === '/dashboard/admin/products' ? 'bg-gray-900 text-white ' : 'hover:bg-gray-100'
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
                  router.pathname === '/dashboard/admin/categories' ? 'bg-gray-900 text-white ' : 'hover:bg-gray-100'
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


        <li><a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
            Calendar
        </a></li>
        <li><a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            Documentation
        </a></li>
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
