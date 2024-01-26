import React from 'react'

export default function ProductImages() {
  return (
    <>
    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">

    <img src='https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg'
    loading="lazy"
    alt='image 1'
    className="h-[20rem] w-full object-cover object-center"
    />

    </div>
    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">

    <img src='https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg'
    loading="lazy"
    alt='image 1'
    className="h-[20rem] w-full object-cover object-center"
    />

    </div>
    </div>
    </>
  )
}




