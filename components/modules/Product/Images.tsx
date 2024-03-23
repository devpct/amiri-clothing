import React from 'react'

export default function ProductImages({ imags }:{ imags:any }) {
  return (
    <>
    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">

    <img src={imags[1]}
    loading="lazy"
    alt='image 1'
    className="h-[20rem] w-full object-cover object-center dark:brightness-[.85]"
    />

    </div>
    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">

    <img src={imags[2]}
    loading="lazy"
    alt='image 1'
    className="h-[20rem] w-full object-cover object-center dark:brightness-[.85]"
    />

    </div>
    </div>
    </>
  )
}




