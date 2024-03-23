import React from 'react'
import { startCase } from 'lodash';

export default function Info({ product }:{ product:any }) {

    const productDetails = {
        name: startCase(product.name),
        description: product.description,
        highlights: [
          'Hand cut and sewn locally',
          'Dyed with our proprietary colors',
          'Pre-washed & pre-shrunk',
          'Ultra-soft 100% cotton',
        ],
        details:
          'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
      }

  return (
    <>
    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">

            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base ">{productDetails.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium ">Highlights</h3>
              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {productDetails.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium">Details</h2>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{productDetails.details}</p>
              </div>
            </div>
            
    </div>
    </>
  )
}