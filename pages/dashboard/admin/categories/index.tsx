import React, { useState } from 'react'
import Navbar from '@/components/templates/Dashboard/Admin/Navbar'
import Sidebar from '@/components/templates/Dashboard/Admin/Sidebar'
import axios from 'axios';
import Categories from '@/components/templates/Dashboard/Admin/Categories';
import useSWR from 'swr';
import {localhostDatabase, localhostBackend} from '@/localhost';


export default function index({ userData }) {

  const [isOpen, setIsOpen] = useState(false);

  const { data: categoriesData } = useSWR('Categories', () =>
  axios.get(`${localhostDatabase}/categories`).then((res) => res.data)
  );

  return (
    <>
    <div className="flex flex-col">
    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    <Navbar isOpen={isOpen} setIsOpen={setIsOpen} data={userData}/>

    <div className='min-[1000px]:h-screen h-full lg:ml-64 my-[3rem]'>
    <Categories categoriesData={categoriesData}/>
    </div>
    </div>
    </>
  )
}

export async function getServerSideProps(context) {
    const { token } = context.req.cookies
  
    const userData = await axios.post(`${localhostBackend}/api/auth/info`,{ token }).then((res) => res.data).catch((err) =>{
      if(err.response.status === 401){
        return {
          redirect:{
            destination: '/',
          }
        }
      }
    })
  
      
    if (userData.role !== 'admin' && userData.role !== 'manager') {
        return {
          redirect:{
            destination: '/',
          }
        }
    }


    return {
      props: {
        userData
      },
    };
}