import React from 'react'
import axios from 'axios'
import Sidebar from '@/components/templates/Dashboard/User/Sidebar'
import Purchased from '@/components/templates/Dashboard/User/Purchased'
import localhostBackend from '@/localhost';

export default function index({ userData, productsData, ordersData }:{ userData:any, productsData:any, ordersData:any }) {

  return (
    <>
    <div className="flex">
    <Sidebar data={userData}/>
    <div className="w-full">
      <h1 className='bg-white dark:bg-gray-900 sticky top-0 z-30 font-bold lg:text-[3rem] text-[2rem] w-full h-fit
      py-2 pl-5 border-b-1'>
        Purchased
      </h1>
    <Purchased  userData={userData} productsData={productsData} ordersData={ordersData} />
    </div>
    </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { token } = context.req.cookies

  if (!token) {
      return {
        redirect:{
          destination: '/',
        }
      }
  }

  const userData = await axios.post('http://localhost:3000/api/auth/info',{ token }).then((res) => res.data)

  const productsData = await axios.get(`${localhostBackend}/products`).then((res) => res.data)

  const ordersData = await axios.get(`${localhostBackend}/order`).then((res) => res.data)

  return {
    props: {
      userData,
      productsData,
      ordersData
    },
  };
}
