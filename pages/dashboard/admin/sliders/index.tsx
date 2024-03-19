import React, { useState } from 'react'
import Navbar from '@/components/templates/Dashboard/Admin/Navbar'
import Sidebar from '@/components/templates/Dashboard/Admin/Sidebar'
import axios from 'axios';
import Sliders from '@/components/templates/Dashboard/Admin/Sliders';
import useSWR from 'swr';


export default function index({ userData }) {

  const [isOpen, setIsOpen] = useState(false);

  const { data: slidersData } = useSWR('Sliders', () =>
  axios.get('http://localhost:4000/slider').then((res) => res.data)
  );

  return (
    <>
    <div className="flex flex-col">
    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    <Navbar isOpen={isOpen} setIsOpen={setIsOpen} data={userData}/>

    <div className='lg:ml-64 my-[3rem]'>
    <Sliders slidersData={slidersData}/>
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