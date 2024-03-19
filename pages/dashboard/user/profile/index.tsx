import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Sidebar from '@/components/templates/Dashboard/User/Sidebar'
import Profile from '@/components/templates/Dashboard/User/Profile'

export default function index() {

  let { data } = useQuery('UserInfo', () =>
  axios.get('/api/auth/info').then((res) => res.data))

  return (
    <>
    <div className="flex">
    <Sidebar data={data}/>
    <div className="w-full">
      <h1 className='bg-white dark:bg-gray-900 sticky top-0 z-30 font-bold lg:text-[3rem] text-[2rem] w-full h-fit
      py-2 pl-5 border-b-1'>
        Profile
      </h1>
    <Profile data={data}/>
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
