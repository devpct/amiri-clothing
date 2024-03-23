import React, { useEffect } from 'react';
import Card from '@/components/modules/Card';
import { useSelector } from 'react-redux';

export default function ProductCard({ productsData, searchResult }:{ productsData?:any, searchResult?:any}) {
  
  const selectedCategoryId = useSelector((state:any) => state.selectedCategoryId);
  const selectedSortBy = useSelector((state:any) => state.selectedSortBy);

  let products;
  if (searchResult){
    products = searchResult
  }else{
    products = productsData
  }

  const compareByPrice = (a:any, b:any) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);

    if (selectedSortBy === 'expensive') {
      return priceB - priceA;
    } else if (selectedSortBy === 'cheapest') {
      return priceA - priceB;
    }
  };

  const sortByProductId = (a:any, b:any) => {
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
              sortedProducts.map((product:any) => (
                (selectedCategoryId === '' || product.category_id === selectedCategoryId) && (
                  <Card key={product.id} productsData={product} />
                  )
                  ))
            }
          </div>
            ) : (
              <div className='grid text-center gap-[1.2rem] mt-8'>
              <img className='m-auto w-[19rem]' src="/noData.svg" alt="" />
              <p className='text-[2rem] font-medium'>No product found</p>
              </div>
            )}
        </div>
      </div>
    </>
  );
}
