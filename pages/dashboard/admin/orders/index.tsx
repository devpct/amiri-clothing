import React, { useState } from 'react'
import Navbar from '@/components/templates/Dashboard/Admin/Navbar'
import Sidebar from '@/components/templates/Dashboard/Admin/Sidebar'
import axios from 'axios';
import Orders from '@/components/templates/Dashboard/Admin/Orders';
import useSWR from 'swr';


export default function index({ userData }) {

  const [isOpen, setIsOpen] = useState(false);

  const { data: ordersData } = useSWR('Orders', () =>
  axios.get('http://localhost:4000/order').then((res) => res.data)
  );

  return (
    <>
    <div className="flex flex-col">
    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    <Navbar isOpen={isOpen} setIsOpen={setIsOpen} data={userData}/>

    <div className='min-[1000px]:h-screen h-full lg:ml-64 my-[3rem]'>
    <Orders ordersData={ordersData}/>
    </div>
    </div>
    </>
  )
}

export async function getServerSideProps(context) {
    const { token } = context.req.cookies
  
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
        userData
      },
    };
}