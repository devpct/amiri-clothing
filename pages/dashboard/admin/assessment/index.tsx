import Navbar from '@/components/templates/Dashboard/Admin/Navbar';
import Sidebar from '@/components/templates/Dashboard/Admin/Sidebar';
import axios from 'axios';
import React, { useState } from 'react'

export default function assessment({userData}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
   <div className="flex">
    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    <Navbar isOpen={isOpen} setIsOpen={setIsOpen} data={userData}/>
      {/* <Profile data={data}/> */}
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