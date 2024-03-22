import Assessment from '@/components/templates/Dashboard/Admin/Assessment';
import Navbar from '@/components/templates/Dashboard/Admin/Navbar';
import Sidebar from '@/components/templates/Dashboard/Admin/Sidebar';
import axios from 'axios';
import React, { useState } from 'react'
import localhostBackend from '@/localhost';

export default function assessment({userData, usersData, productsData, categoriesData, cartData,commentsData, sliderData}:{userData:any, usersData:any, productsData:any, categoriesData:any, cartData:any,commentsData:any, sliderData:any}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <div className="flex flex-col">
    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    <Navbar isOpen={isOpen} setIsOpen={setIsOpen} data={userData}/>
      <div className='min-[1000px]:h-screen h-full lg:ml-64 py-[3rem]'>
      <Assessment usersData={usersData} productsData={productsData} categoriesData={categoriesData} cartData={cartData} commentsData={commentsData} sliderData={sliderData} />
      </div>
    </div>
    </>
  )
}


export async function getServerSideProps(context) {
  const { token } = context.req.cookies
  const usersData = await axios.get(`${localhostBackend}/users`).then((res) => res.data)
  const productsData = await axios.get(`${localhostBackend}/products`).then((res) => res.data)
  const categoriesData = await axios.get(`${localhostBackend}/categories`).then((res) => res.data)
  const cartData = await axios.get(`${localhostBackend}/cart`).then((res) => res.data)
  const commentsData = await axios.get(`${localhostBackend}/comments`).then((res) => res.data)
  const sliderData = await axios.get(`${localhostBackend}/slider`).then((res) => res.data)
  const userData = await axios.post('/api/auth/info',{ token }).then((res) => res.data).catch((err) =>{
    if(err.response.status === 401){
      return {
        redirect:{
          destination: '/',
        }
      }
    }
  })

    
  if (userData.role !== 'admin') {
      return {
        redirect:{
          destination: '/',
        }
      }
  }

  return {
    props: {
      userData,
      usersData,
      productsData,
      categoriesData,
      cartData,
      commentsData,
      sliderData
    },
  };
}