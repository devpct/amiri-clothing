import React from 'react'
import Image from 'next/image'

export default function ProductImages() {
  return (
    <>
    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
    <Image 
        src={'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg'}
        alt={'image 1'}
        width={'500'}
        height={'500'}
        quality={100}
        className="h-[20rem] w-full object-cover object-center"
    />
    </div>
    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
    <Image 
        src={'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg'}
        alt={'image 1'}
        width={'500'}
        height={'500'}
        quality={100}
        className="h-[20rem] w-full object-cover object-center"
    />
    </div>
    </div>
    </>
  )
}




