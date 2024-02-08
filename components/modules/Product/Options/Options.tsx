import React,{ useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'

export default function Options({ product }) {

  const productDetails = {
    price: Number(product.price).toLocaleString(),
    colors: [
      { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
      { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
      { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
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
  }

  productDetails.sizes.forEach((size) => {
    size.inStock = product.size.includes(size.name.toLowerCase());
  });
  
  const reviews = { href: '#', average: 4, totalCount: 117 }

  const [selectedColor, setSelectedColor] = useState(productDetails.colors[0])
  const [selectedSize, setSelectedSize] = useState(productDetails.sizes[2])

  return (
    <>
    <div className="mt-4 lg:row-span-3 lg:mt-0">
            <p className="text-3xl tracking-tight text-gray-900">${productDetails.price}</p>


            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={`
                      ${reviews.average < rating ? 'text-gray-200 h-5 w-5 flex-shrink-0' : 'text-gray-900 h-5 w-5 flex-shrink-0' }`}
                    aria-hidden="true"
                    />
                  ))}
                </div>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-zinc-500 hover:text-zinc-400">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>


            <form className="mt-8">

              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                  <div className="flex items-center space-x-3">
                    {productDetails.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          `
                            w-[2rem]
                            h-[2rem]
                            ${color.class}
                            ${color.selectedClass}
                            ${active && checked ? 'ring ring-offset-1' : ''}
                            ${!active && checked ? 'ring-2' : ''}
                            'relative -m-0.5 flex cursor-pointer justify-center rounded-full p-0.5 focus:outline-none'
                          `
                        }
                      >
                        <span
                          aria-hidden="true"
                          className={`
                            ${color.class}
                            'h-8 w-8 rounded-full border border-zinc-200 border-opacity-10'
                          `}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>


              {/* Sizes */}
              <div className="mt-7">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a href="#" className="text-sm font-medium text-zinc-400 hover:text-zinc-300">
                    Size guide
                  </a>
                </div>
                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {productDetails.sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ active }) =>
                        `
                            ${size.inStock
                              ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                              : 'cursor-not-allowed bg-gray-50 text-gray-200'}
                            ${active ? 'ring-2 ring-zinc-500' : ''}
                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
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


              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-zinc-900 px-8 py-3 text-base font-medium text-white hover:bg-zinc-700 focus:outline-none"
              >
                Add to bag
              </button>

            </form>

      </div>
    </>
  )
}