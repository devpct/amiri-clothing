import Link from 'next/link'
import React from 'react'
import Selected from '@/components/modules/Selected'
import SidebarSearch from '@/components/modules/Sidebar/SidebarSearch'

export default function Sidebar() {

  return (
    <>
    <aside className="hidden lg:flex flex-col w-64 px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
    <div className="fixed w-[12.3rem] h-full">

    <div className='w-full text-center'>
    <Link href="/" className='font-[roboto] font-bold text-[2rem] tracking-[0.5rem] text-black'>
    AMIRI
    </Link>
    </div>

    <SidebarSearch/>

    <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className='grid gap-y-3'>
        <Selected/>
        <Selected/>
        <Selected/>
        </nav>
    </div>
    
    </div>
</aside>
    </>
  )
}
