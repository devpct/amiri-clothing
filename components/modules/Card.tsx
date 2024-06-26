import Link from 'next/link'
import { startCase } from 'lodash';
import Image from 'next/image';


export default function Card({ productsData }) {
  return (
    <>
    <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <Image 
          src={ productsData.images[0] } 
          alt={productsData.name}             
          className="h-full w-full object-cover object-center lg:h-full lg:w-full dark:brightness-[.85]"
          width={500}
          height={500}
          quality={100}
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm">
              <Link href={`/products/${productsData.name}`}>
                <span aria-hidden="true" className="absolute inset-0"></span>
                {startCase(productsData.name)}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{productsData.colors.join(' , ')}</p>
          </div>
          <p className="text-sm font-medium">${Number(productsData.price).toLocaleString()}</p>
        </div>
      </div>
    </>
  )
}
