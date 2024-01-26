import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Card() {
  return (
    <>
    <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <Image 
          src={'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'}
          alt="Front of men&#039;s Basic Tee in black."
          width={'500'}
          height={'500'}
          quality={100}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
		  />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <Link href="products/Basic Tee">
                <span aria-hidden="true" className="absolute inset-0"></span>
                Basic Tee 6-Pack
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500">Black</p>
          </div>
          <p className="text-sm font-medium text-gray-900">$35</p>
        </div>
      </div>
    </>
  )
}
