import ProductCard from '@/components/templates/Products/ProductCards'
import Sidebar from '@/components/templates/Products/Sidebar'
import React from 'react'

import '@radix-ui/themes/styles.css';
import ProductsSettings from '@/components/templates/Products/ProductsSettings';

export default function index() {
  return (
    <>
    <div className="flex">
      <Sidebar/>
    <div className="w-full">
      <h1 className='bg-white fixed z-50 font-bold lg:text-[3rem] text-[2rem] w-full h-fit
      py-2 pl-5 border-b-1'>All Products</h1>
      <ProductsSettings/>
      <ProductCard/>
    </div>
    </div>
    </>
  )
}
