
import React,{ useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { startCase } from 'lodash';
import Link from 'next/link';




export default function Options({ product, isLogin, handleShoppingCarts }:{ product:any, isLogin:any, handleShoppingCarts:any }) {
  
  const productDetails = {
    price: Number(product.price).toLocaleString(),

    sizes: [
      { name: 'XXS', inStock: false },
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true },
      { name: '2XL', inStock: true },
      { name: '3XL', inStock: true },
    ],
  };
  
  
  const colors = product.colors.map((color:any, index:any) => ({
    name: color,
    class: product.colors_code[index],
  }));
  
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedSize, setSelectedSize] = useState(productDetails.sizes[2])
  
  productDetails.sizes.forEach((size) => {
    size.inStock = product.size.includes(size.name.toLowerCase());
  });
  
  const reviews = { href: '#', average: 4, totalCount: 117 }
  

  useEffect(() =>{
    console.log(colors,selectedColor);
  },[selectedColor])

  return (
    <>
    <div className="mt-4 lg:row-span-2 lg:mt-0">
            <p className="text-3xl tracking-tight">${productDetails.price}</p>


            {/* Reviews */}
            {/* <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={`
                      ${reviews.average < rating ? 'text-gray-200 h-5 w-5 flex-shrink-0' : ' h-5 w-5 flex-shrink-0' }`}
                    aria-hidden="true"
                    />
                  ))}
                </div>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-zinc-500 hover:text-zinc-400">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div> */}


            <form className="mt-8">

           {/* Colors */}
            <div>
              <h3 className="text-sm font-medium ">Color</h3>
              <RadioGroup value={selectedColor} className="mt-4">
                <div className="flex items-center space-x-3 ">
                  {colors.map((color:{name:any,class:any}) => (
                    <div className={`flex gap-x-3  p-[0.8rem] rounded-full cursor-pointer
                    ${selectedColor.name === color.name ? `bg-[#000000] dark:bg-white` : ''}
                    `}
                    onClick={()=>setSelectedColor(color)}
                    >
                    <RadioGroup.Option
                      key={color.name}
                      value={color}
                      style={{backgroundColor : color.class}}
                      className={
                        `
                        border-[0.1rem]
                        border-gray-400
                        w-[2rem]
                        h-[2rem]
                        ${selectedColor.name === color.name ? 'ring-[#757575] ring-[1px] ring-offset-[3px] ' : ''}
                        relative -m-0.5 flex justify-center rounded-full p-0.5 focus:outline-none
                        ${color !== colors[0]  ? 'ml-[8px]' : ''}
                        `
                    }
                    />
                    <h1 className={`font-[system-ui] font-medium 
                    ${selectedColor.name === color.name ? 'text-white dark:text-black' : 'text-gray-700 dark:text-white'}
                    `}>{startCase(color.name)}</h1>
                  </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

    

            {/* Sizes */}
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium ">Size</h3>
                <a href="#" className="text-sm font-medium text-zinc-400 hover:text-zinc-300">
                  Size guide
                </a>
              </div>
              <RadioGroup value={selectedSize} className="mt-4">
                <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                  {productDetails.sizes.map((size) => (
                    <RadioGroup.Option
                      key={size.name}
                      value={size}
                      disabled={!size.inStock}
                      onClick={()=>setSelectedSize(size)}
                      className={
                      `
                          ${size.inStock
                            ? 'cursor-pointer  shadow-sm'
                            : 'cursor-not-allowed bg-gray-50 text-gray-200'}
                          ${selectedSize.name === size.name ? 'ring-2 ring-zinc-500 bg-black dark:bg-white text-white dark:text-black' : ''}
                          'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase   sm:flex-1 sm:py-6'
                        `
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                          {size.inStock ? (
                            <span
                              className={`
                                ${active ? 'border' : 'border-2'}
                                ${checked ? 'border-zinc-500' : 'border-transparent'}
                                'pointer-events-none absolute -inset-px rounded-md'
                              `}
                              aria-hidden="true"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                stroke="currentColor"
                              >
                                <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                              </svg>
                            </span>
                          )}
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {isLogin === undefined ?
            <Link href='/login'>
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-zinc-900 dark:bg-white dark:text-black px-8 py-3 text-base font-medium text-white  focus:outline-none lg:mb-5"
                onClick={()=>handleShoppingCarts(selectedColor,selectedSize)}
                >
                Add to bag
              </button>
              </Link>
              :
              <button
              type="button"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-zinc-900 dark:bg-white dark:text-black px-8 py-3 text-base font-medium text-white  focus:outline-none lg:mb-5"
              onClick={()=>handleShoppingCarts(selectedColor,selectedSize)}
              >
              Add to bag
              </button>
              }
            </form>

      </div>
    </>
  )
}