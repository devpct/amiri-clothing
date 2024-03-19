import React, { useState } from 'react'
import { toast, Bounce } from 'react-toastify';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from 'swiper/modules';
import Head from "next/head";
import Input from '@/components/modules/Input'
import "swiper/css";
import { useQuery } from 'react-query';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IndexProps {
    sliderData: any;
}

interface sliderData {
    id: number;
    image: string;
}

const Index: React.FC<IndexProps> = ({ sliderData }) => {

    const { data } = useQuery('Slider', () =>
    axios.get('https://amiri-clothing-server.liara.run/slider').then((res) => res.data),
    {
      initialData: sliderData,
      staleTime: 900000,
      cacheTime: 900000,
    }
  );
  
  const router = useRouter()

  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signup = (event) => {
    event.preventDefault()

    const customer = { fullname, email, password, role: "customer" }

    axios.post('/api/auth/signup', customer)
      .then((res) => {        
        if (res.status === 201) {        
          setFullname("");
          setEmail("");
          setPassword("");
          localStorage.setItem('toast', 'signup');
          router.replace('/');
        }
      })
      .catch((error) => {
        if(error.response.status === 422) {
            toast.warn('Sorry, the email you entered is already in use by another user', {
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
        }else if(error.response.status === 400) {
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
    <section className="h-[100vh]">
    <div className="grid grid-cols-1 lg:grid-cols-2 h-full" >
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-10 ">

            <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto ">

                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Signup</h2>
                <p className="mt-2 text-base text-gray-600">Already have an account? <Link href="/login" title="" className="font-bold border-b-2 text-black transition-all duration-200 hover:text-gray-700">Login</Link></p>

                <form className="mt-8">
                    <div className="space-y-5">
                    <Input 
                    label='Full Name' 
                    placeholder='Enter your full name' 
                    value={fullname} 
                    onChange={event=> setFullname(event.target.value)}
                    />

                    <Input 
                    label='Email address' 
                    placeholder='Enter email to get started'
                    value={email} 
                    onChange={event=> setEmail(event.target.value)}
                    />
                    
                    <Input 
                    label='Password' 
                    placeholder='Enter your password'
                    value={password} 
                    onChange={event=> setPassword(event.target.value)}
                    />

                        <div className="flex items-center">
                            <input type="checkbox" name="agree" id="agree" className="w-5 h-5 text-blue-600 border-gray-200 rounded" />

                            <label className="ml-3 text-sm font-medium text-gray-500">
                                I agree to Postcraft’s <a href="#" title="" className="text-blue-600 hover:text-blue-700 hover:underline">Terms of Service</a> and <a href="#" title="" className="text-blue-600 hover:text-blue-700 hover:underline">Privacy Policy</a>
                            </label>
                        </div>

                        <div>
                            <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-black border border-transparent rounded-md focus:outline-none hover:bg-gray-800 "
                            onClick={signup}>
                                Create free account
                            </button>
                        </div>
                    </div>
                </form>

                <div className="mt-3 space-y-3">
                    <button
                        type="button"
                        className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                    >
                        <div className="absolute inset-y-0 left-0 p-4">
                            <svg className="w-6 h-6 text-rose-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                                ></path>
                            </svg>
                        </div>
                        Sign up with Google
                    </button>

                    <button
                        type="button"
                        className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                    >
                        <div className="absolute inset-y-0 left-0 p-4">
                            <svg className="w-6 h-6 text-[#2563EB]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                            </svg>
                        </div>
                        Sign up with Facebook
                    </button>
                </div>
            </div>
        </div>

        <div className="lg:flex hidden items-center justify-center bg-gray-50">
        <Swiper 
          className="mySwiper w-full cursor-pointer h-full" 
          loop={true} 
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
        >
        {
        data.map((slider:sliderData) => (
          <SwiperSlide key={slider.id}>
            <img src={slider.image}
            loading="lazy"
            alt='Slider'
            className='w-full h-full object-fill'
            />
          </SwiperSlide>
        ))
        }
    </Swiper>
        </div>
    </div>
</section>
    </>
  )
}

export default Index

export async function getServerSideProps(context) {
    const { token } = context.req.cookies

    if (token) {
        return {
          redirect:{
            destination: '/',
          }
        }
    }

    const sliderData = await axios.get('https://amiri-clothing-server.liara.run/slider').then((res) => res.data);

    return {
      props: {
        sliderData,
      },
    };
}