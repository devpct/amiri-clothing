import React from 'react'

export default function ProductImage({ imag }) {
  return (
    <>
    <img src={imag}
    loading="lazy"
    alt='image 1'
    className="h-[42rem] w-full object-cover object-center"
    />
    </>
  )
}