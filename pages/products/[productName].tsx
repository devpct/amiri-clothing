import React from 'react'
import Address from '@/components/templates/Product/Address'
import ImageGallery from '@/components/templates/Product/ImageGallery'
import ProductInfo from '@/components/templates/Product/ProductInfo'
import Head from "next/head";
import axios from 'axios';
import { useQuery } from 'react-query';
import localhostBackend from '@/localhost';


export default function product({ product, categories, cart }:{product:any,categories:any,cart:any}) {

  let { data } = useQuery('UserInfo', () =>
  axios.get('http://localhost:3000/api/auth/info').then((res) => res.data))

  return (
    <>
    <Head>
        <title>AMIRI - {product[0].name.toUpperCase()}</title>
    </Head>
     <div className=" font-[system-ui]">
      <div className="pt-6">
        
      <Address product={product[0]} categories={categories}/>
      <ImageGallery product={product[0]}/>
      <ProductInfo product={product[0]} isLogin={data} cart={cart}/>
        
      </div>
    </div>
    </>
  )
}

export async function getStaticPaths() {
  const products = await axios.get(`${localhostBackend}/products`).then((res) => res.data);

  const paths = products.map((product:any) => ({
    params: { productName: product.name },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context:any) {
  const { params } = context;

  const product = await axios.get(`${localhostBackend}/products?name=${params.productName}`).then((res) => res.data);

  const categories = await axios.get(`${localhostBackend}/categories`).then((res) => res.data)
  const cart = await axios.get(`${localhostBackend}/cart`).then((res) => res.data)

  return {
    props: {
      product,
      categories,
      cart
    },
  };
}
