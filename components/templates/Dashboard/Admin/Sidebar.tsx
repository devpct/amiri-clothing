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
        className={`lg:mt-20 mt-[63px] hs-overlay transition-all duration-300 transform  fixed top-0 start-0 bottom-0  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 ${
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
                className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 ${
                  router.pathname === '/dashboard/admin/account' ? 'bg-gray-900 text-white' : ''
                }`}
                onClick={() => router.push('/dashboard/admin/account')}
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
                  <circle cx="18" cy="15" r="3" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M10 15H6a4 4 0 0 0-4 4v2" />
                  <path d="m21.7 16.4-.9-.3" />
                  <path d="m15.2 13.9-.9-.3" />
                  <path d="m16.6 18.7.3-.9" />
                  <path d="m19.1 12.2.3-.9" />
                  <path d="m19.6 18.7-.4-1" />
                  <path d="m16.8 12.3-.4-1" />
                  <path d="m14.3 16.6 1-.4" />
                  <path d="m20.7 13.8 1-.4" />
                </svg>
                Account
              </button>
            </li>

            <li>
              <button
                className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 ${
                  router.pathname === '/dashboard/admin/projects' ? 'bg-gray-900 text-white' : ''
                }`}
                onClick={() => router.push('/dashboard/admin/projects')}
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
                  <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z" />
                  <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" />
                  <path d="M15 2v5h5" />
                </svg>
                Projects
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
