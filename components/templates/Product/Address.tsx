import React from 'react'
import Link from 'next/link'
import { startCase } from 'lodash';


export default function Address({ product, categories }) {

  const categoryName = categories[product.category_id - 1].name;

  
  const breadcrumbs = [
      { id: 1, name: 'Prducts', href: '/products' },
      categoryName.includes('women') || categoryName.includes('men')? 
      { id: 2, name: categoryName.includes('women') ? 'Women ' : 'Men', href:categoryName.includes('women') ? 'women ' : 'men' }
      : null,
      { id: 2, name: startCase(categoryName.replace(/mens|womens/gi, '')), href: '#' },
  ];
  
    
    const productDetails = {
        name: startCase(product.name),
        href: '#'
      }

  return (
    <>
    <nav aria-label="Breadcrumb" className='lg:sticky lg:top-[7.5%] lg:bg-white lg:pb-5'>
          <ol role="list" className="flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <Link href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </Link>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <Link href={productDetails.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {productDetails.name}
              </Link>
            </li>
          </ol>
    </nav>
    </>
  )
}