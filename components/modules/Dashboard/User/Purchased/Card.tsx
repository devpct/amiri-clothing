import React, { useEffect } from 'react'
import Link from 'next/link'
import { startCase } from 'lodash';

export default function Card({ product, order }) {

  return (
    <>
    <div className="cursor-pointer group relative rounded-md overflow-hidden text-white sm:block flex sm:h-fit h-[7rem] w-full sm:w-fit text-left ">
        <div className="aspect-h-1 aspect-w-1 overflow-hidden lg:aspect-none  group-hover:opacity-75 ">
          <img src={ product.images[0]}
            loading="lazy"
            alt={product.name}
            className="sm:h-[15rem] sm:w-[15rem] h-full w-[7rem] object-cover object-center "
            />
        </div>
        <div className='sm:w-full w-[78%]'>
        <div className="p-2 bg-black">
        <h3 className="text-sm line-clamp-1">
          <Link href={`/products/${product.name}`}>
            {startCase(product.name)}
          </Link>
        </h3>
        <div className='grid grid-cols-2 my-2'>
        <p className="text-sm ">{order.color_name}</p>
        <p className="text-sm font-medium">${Number(product.price).toLocaleString()}</p>
        <p className="text-sm font-medium">Size: {order.size}</p>
        <p className="text-sm font-medium">QTY: {order.qty}</p>
        </div>
        </div>
        <div className={`grid w-full  ${order.status === 'preparing' ? 'bg-red-500' : order.status === 'sending' ? 'bg-yellow-500': order.status === 'delivery' ? 'bg-green-500':null} sm:h-8`}>
        <p className="text-sm font-medium m-auto">{order.status}</p>
        </div>
        </div>
      </div>
    </>
  )
}
