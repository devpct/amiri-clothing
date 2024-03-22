import ProductCard from '@/components/templates/Products/ProductCards'
import ProductsSettings from '@/components/templates/Products/ProductsSettings'
import Sidebar from '@/components/templates/Products/Sidebar'
import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import localhostBackend from '@/localhost';

export default function index({ productsData, categoriesData, searchResult }) {

  const { data:products } = useQuery('Products', () =>
  axios.get(`${localhostBackend}/products`).then((res) => res.data),
  {
    initialData: productsData,
    staleTime: 900000,
    cacheTime: 900000,
  }
  )

  const { data:categories } = useQuery('Categories', () =>
  axios.get(`${localhostBackend}/categories`).then((res) => res.data),
  {
    initialData: categoriesData,
    staleTime: 900000,
    cacheTime: 900000,
  }
  )

  return (
    <>
    <div className="flex">
      <Sidebar categoriesData={categories}/>
    <div className="w-full">
      <h1 className='fixed z-50 font-bold lg:text-[3rem] text-[2rem] w-full h-fit
      py-2 pl-5 border-b-1'>
        Search
      </h1>
      <ProductsSettings categoriesData={categories}/>
      <ProductCard productsData={products} searchResult={searchResult}/>
    </div>
    </div>
    </>
  )
}


export async function getServerSideProps(context) {
  
  const { query } = context;

  const productsData = await axios.get(`${localhostBackend}/products`).then((res) => res.data)
  const categoriesData = await axios.get(`${localhostBackend}/categories`).then((res) => res.data)
  
  const searchResult = productsData.filter(
    (item) =>
      item.name.toLowerCase().includes(query.q.toLowerCase())
  );
  
  return {
    props: {
      productsData,
      categoriesData,
      searchResult
    },
  };
}