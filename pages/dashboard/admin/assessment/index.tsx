import Assessment from '@/components/templates/Dashboard/Admin/Assessment';
import Navbar from '@/components/templates/Dashboard/Admin/Navbar';
import Sidebar from '@/components/templates/Dashboard/Admin/Sidebar';
import axios from 'axios';
import React, { useState } from 'react'
import {localhostDatabase, localhostBackend} from '@/localhost';

export default function assessment({userData, usersData, productsData, categoriesData, cartData,commentsData, sliderData}) {
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
  const usersData = await axios.get(`${localhostDatabase}/users`).then((res) => res.data)
  const productsData = await axios.get(`${localhostDatabase}/products`).then((res) => res.data)
  const categoriesData = await axios.get(`${localhostDatabase}/categories`).then((res) => res.data)
  const cartData = await axios.get(`${localhostDatabase}/cart`).then((res) => res.data)
  const commentsData = await axios.get(`${localhostDatabase}/comments`).then((res) => res.data)
  const sliderData = await axios.get(`${localhostDatabase}/slider`).then((res) => res.data)
  const userData = await axios.post(`${localhostBackend}/api/auth/info`,{ token }).then((res) => res.data).catch((err) =>{
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