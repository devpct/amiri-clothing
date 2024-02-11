import React, { useEffect } from 'react'
import Address from '@/components/templates/Product/Address'
import ImageGallery from '@/components/templates/Product/ImageGallery'
import ProductInfo from '@/components/templates/Product/ProductInfo'
import Head from "next/head";
import axios from 'axios';


export default function product({ product, categories }) {

  // useEffect(()=>{
  //   console.log(product[0]);
  // },[])
  return (
    <>
    <Head>
        <title>AMIRI - {product[0].name.toUpperCase()}</title>
    </Head>
     <div className="bg-white font-[system-ui]">
      <div className="pt-6">
        
      <Address product={product[0]} categories={categories}/>
      <ImageGallery product={product[0]}/>
      <ProductInfo product={product[0]}/>
        
      </div>
    </div>
    </>
  )
}

export async function getStaticPaths(context) {
  const products = await axios.get('http://localhost:4000/products').then((res) => res.data);

  const paths = products.map((product) => ({
    params: { productName: product.name },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  const product = await axios.get(`http://localhost:4000/products?name=${params.productName}`).then((res) => res.data);

  const categories = await axios.get('http://localhost:4000/categories').then((res) => res.data)

  return {
    props: {
      product,
      categories
    },
  };
}
