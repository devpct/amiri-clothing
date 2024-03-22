import React, { useState } from 'react'
import Navbar from '@/components/templates/Dashboard/Admin/Navbar'
import Sidebar from '@/components/templates/Dashboard/Admin/Sidebar'
import axios from 'axios';
import Products from '@/components/templates/Dashboard/Admin/Products';
import useSWR from 'swr';
import localhostBackend from '@/localhost';


export default function index({ userData, categoriesData }:{ userData:any, categoriesData:any }) {

  const [isOpen, setIsOpen] = useState(false);

  const { data: productsData } = useSWR('Products', () =>
  axios.get(`${localhostBackend}/products`).then((res) => res.data)
  );

  return (
    <>
    <div className="flex flex-col">
    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    <Navbar isOpen={isOpen} setIsOpen={setIsOpen} data={userData}/>

    <div className='min-[1000px]:h-screen h-full lg:ml-64 my-[3rem]'>
    <Products productsData={productsData} categoriesData={categoriesData}/>
    </div>
    </div>
    </>
  )
}

export async function getServerSideProps(context) {
    const { token } = context.req.cookies
  
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

    const categoriesData = await axios.get(`${localhostBackend}/categories`).then((res) => res.data)

    return {
      props: {
        userData,
        categoriesData
      },
    };
}