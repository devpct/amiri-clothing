import Image from 'next/image'
import React from 'react'

export default function ProductImage({ imag }) {
  return (
    <>
    <Image 
    src={imag}
    alt=''        
    className="h-[42rem] w-full object-cover object-center dark:brightness-[.85]"
    width={500}
    height={500}
    quality={100}
    />
    </>
  )
}