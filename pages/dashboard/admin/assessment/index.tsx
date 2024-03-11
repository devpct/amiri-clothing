import Assessment from '@/components/templates/Dashboard/Admin/Assessment';
import Navbar from '@/components/templates/Dashboard/Admin/Navbar';
import Sidebar from '@/components/templates/Dashboard/Admin/Sidebar';
import axios from 'axios';
import React, { useState } from 'react'

export default function assessment({userData, usersData, productsData, categoriesData, cartData, 
  commentsData, sliderData}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <div className="flex flex-col">
    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    <Navbar isOpen={isOpen} setIsOpen={setIsOpen} data={userData}/>
      <div className='lg:ml-64 my-[3rem]'>
      <Assessment usersData={usersData} productsData={productsData} categoriesData={categoriesData} cartData={cartData} commentsData={commentsData} sliderData={sliderData} />
      </div>
    </div>
    </>
  )
}


export async function getServerSideProps(context) {
  const { token } = context.req.cookies
  const usersData = await axios.get('http://localhost:4000/users').then((res) => res.data)
  const productsData = await axios.get('http://localhost:4000/products').then((res) => res.data)
  const categoriesData = await axios.get('http://localhost:4000/categories').then((res) => res.data)
  const cartData = await axios.get('http://localhost:4000/cart').then((res) => res.data)
  const commentsData = await axios.get('http://localhost:4000/comments').then((res) => res.data)
  const sliderData = await axios.get('http://localhost:4000/slider').then((res) => res.data)
  const userData = await axios.post('http://localhost:3000/api/auth/info',{ token }).then((res) => res.data).catch((err) =>{
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