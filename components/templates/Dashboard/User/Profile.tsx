import Input from '@/components/modules/Input'
import axios from 'axios';
import { startCase } from 'lodash';
import React, { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify';

export default function Profile({ data }:{data:any}) {

  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    setFullname(data?.fullname)
    setEmail(data?.email)
    setPhoneNumber(data?.phonenumber)
    setAddress(data?.address)
  },[data])

  const update = (event) => {
    event.preventDefault()

    const customer = { fullname, email, password, phoneNumber, address, role: data?.role }

    axios.put('/api/auth/info-update', customer)
      .then((res) => {
        if (res.status === 200) {
            toast.success('The update was done successfully ((:', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
       })
      .catch((error) => {
        if(error.response.status === 400) {
            toast.error('The information is not complete!!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
      })
  }
  return (
    <>
        <div className="container my-9 mx-auto lg:h-[70vh] flex flex-col items-center justify-center gap-10 ">
        <div className="w-full flex justify-center flex-wrap gap-7">
          <Input label='Full Name' placeholder='Enter your name...' value={fullname} onChange={(event)=> setFullname(event.target.value)}/>
          <Input label='Email' placeholder='Enter your Email...' value={email} onChange={(event)=> setEmail(event.target.value)}/>
          <Input label='Password' placeholder='Enter your New Password...' value={password} onChange={(event)=> setPassword(event.target.value)}/>
          <Input label='Phone Number' placeholder='Enter your Phone Number...' value={phoneNumber} onChange={(event)=> setPhoneNumber(event.target.value)}/>
          <Input label='Role' value={startCase(data?.role)} InputOff={true} />
          <div className='w-full mx-5 lg:mx-[6.8rem]'>
            <p className='mb-1 '>Address</p>
                <div className="relative">
                    <textarea className="p-4 pb-12 block w-full h-[120px] bg-[#F7F7FA] border-[#E0DEF7] border rounded-lg text-sm focus:outline-none text-black" placeholder='Enter your Address...' onChange={(event)=> setAddress(event.target.value)} value={address}></textarea>
                    <div className="absolute bottom-px inset-x-px p-2 rounded-b-md bg-gray-100 ">
                    </div>
                </div>
            </div>
        </div>
        <button type="button" className="w-[15rem] px-4 py-4 text-base font-semibold  transition-all duration-200border border-transparent rounded-md focus:outline-none dark:bg-[#d2d2d2] dark:text-gray-900 bg-black text-white" onClick={update}>Update</button>
      </div>
    </>
  )
}

