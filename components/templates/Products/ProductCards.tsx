import React from 'react';
import Card from '@/components/modules/Card';
import { useSelector } from 'react-redux';
import Image from 'next/image';

export default function ProductCard({ productsData, searchResult }:{ productsData?:any, searchResult?:any}) {
  
  const selectedCategoryId = useSelector((state:any) => state.selectedCategoryId);
  const selectedSortBy = useSelector((state:any) => state.selectedSortBy);

  let products;
  if (searchResult){
    products = searchResult
  }else{
    products = productsData
  }

  const compareByPrice = (a, b) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);

    if (selectedSortBy === 'expensive') {
      return priceB - priceA;
    } else if (selectedSortBy === 'cheapest') {
      return priceA - priceB;
    }
  };

  const sortByProductId = (a, b) => {
    return a.id - b.id;
  };

  let sortedProducts;
  if (selectedSortBy === 'expensive' || selectedSortBy === 'cheapest') {
    sortedProducts = products?.sort(compareByPrice);
  } else {
    sortedProducts = products?.sort(sortByProductId);
  }

  return (
    <>
      <div className=" lg:mt-[5.5rem] lg:pb-4">
        <div className="w-full px-4 sm:px-6 lg:py-1 lg:px-8">
          {sortedProducts?.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5  xl:gap-x flex-wrap">
            {
              sortedProducts.map(product => (
                (selectedCategoryId === '' || product.category_id === selectedCategoryId) && (
                  <Card key={product.id} productsData={product} />
                  )
                  ))
            }
          </div>
            ) : (
              <div className='grid text-center gap-[1.2rem] mt-8'>
              <Image 
              src="/noData.svg"
              alt=''             
              className='m-auto w-[19rem]'
              width={500}
              height={500}
              quality={100}
              />
              <p className='text-[2rem] font-medium'>No product found</p>
              </div>
            )}
        </div>
      </div>
    </>
  );
}
