import React from 'react'
import CategorySelect from '@/components/modules/Product/Sidebar/CategorySelect'
import SidebarSearch from '@/components/modules/Product/Sidebar/SidebarSearch'
import ProductsSort from '@/components/modules/Product/Sidebar/ProductsSort'

export default function ProductsSettings({ categoriesData }:{categoriesData:any}) {

  return (
    <>
    <div className="lg:hidden mt-[5rem] px-4">
        <SidebarSearch/>
        <div className="flex gap-x-5 my-5 w-full justify-center">
          <div className='w-full'>
          <p className='text-center mb-2'>Categories</p>
           <CategorySelect categoriesData={categoriesData}/>
          </div>
          <div className='w-full'>
          <p className='text-center mb-2'>Sort by</p>
           <ProductsSort />
          </div>
        </div>
    </div>
    </>
  )
}
