import React from 'react'
import Image from '@/components/modules/Product/Image'
import Images from '@/components/modules/Product/Images'

export default function ImageGallery() {

  return (
    <>
     <div className=" mt-6 w-full sm:px-6 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8">

          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <Image/>
          </div>

          <Images/>

          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
          <Image/>
          </div>

    </div>
    </>
  )
}