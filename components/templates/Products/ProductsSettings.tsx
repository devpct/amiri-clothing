import React from 'react'
import Selected from '@/components/modules/Selected'
import SidebarSearch from '@/components/modules/Sidebar/SidebarSearch'

export default function ProductsSettings() {

  return (
    <>
    <div className="lg:hidden mt-[5rem] px-4">
        <SidebarSearch/>
        <div className="flex gap-x-5 my-5 w-full justify-center">
           <Selected/>
           <Selected/>
           <Selected/>
        </div>
    </div>
    </>
  )
}
