import Image from 'next/image'
import React from 'react'

export default function ProductImages({ imags }) {
  return (
    <>
    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">

    <Image 
    src={imags[1]}
    alt=''       
    className="h-[20rem] w-full object-cover object-center dark:brightness-[.85]"
    width={500}
    height={500}
    quality={100}
    />

    </div>
    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">

    <Image 
    src={imags[2]}
    alt=''       
    className="h-[20rem] w-full object-cover object-center dark:brightness-[.85]"
    width={500}
    height={500}
    quality={100}
    />

    </div>
    </div>
    </>
  )
}




