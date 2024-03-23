import React from 'react'

export default function ProductImage({ imag }: {imag:any}) {
  return (
    <>
    <img src={imag}
    loading="lazy"
    alt='image 1'
    className="h-[42rem] w-full object-cover object-center dark:brightness-[.85]"
    />
    </>
  )
}