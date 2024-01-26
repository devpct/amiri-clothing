import React from 'react'
import Image from 'next/image'

export default function ProductImage() {
  return (
    <>
    <Image 
        src={'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg'}
        alt={'image 1'}
        width={'500'}
        height={'500'}
        quality={100}
        className="h-[42rem] w-full object-cover object-center"
    />
    </>
  )
}