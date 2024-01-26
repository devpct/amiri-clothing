import React from 'react'
import Options from '@/components/modules/Product/Options/Options'
import Info from '@/components/modules/Product/Info'

export default function ProductInfo() {

  return (
    <>
    <div className="w-full px-4 pt-10 sm:px-6 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-10">

          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {'Basic Tee 6-Pack'}
            </h1>
          </div>

          <Options/>
          <Info/>

        </div>
    </>
  )
}