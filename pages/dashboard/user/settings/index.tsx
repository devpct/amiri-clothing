import Sidebar from '@/components/templates/Dashboard/User/Sidebar'
import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

export default function settings() {

    let { data } = useQuery('UserInfo', () =>
    axios.get('/api/auth/info').then((res) => res.data))

  return (
    <>
    <div className="flex">
    <Sidebar data={data}/>
    <div className="w-full">
      <h1 className='bg-white sticky top-0 z-30 font-bold lg:text-[3rem] text-[2rem] w-full h-fit
      py-2 pl-5 border-b-1'>
        Settings
      </h1>

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

  return {
    props: {},
  };
}
