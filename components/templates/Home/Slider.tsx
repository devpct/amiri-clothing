import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";


export default function Slider() {
  return (
    <>
    <Swiper 
    className="mySwiper w-full lg:h-[40rem] h-[18rem] cursor-pointer" 
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
        <SwiperSlide >
            <img src='https://idehalmag.com/wp-content/uploads/2021/01/%D9%85%D8%B9%D8%B1%D9%81%DB%8C-%D8%A7%D9%86%D9%88%D8%A7%D8%B9-%D8%A7%D8%B3%D8%AA%D8%A7%DB%8C%D9%84-%D9%85%D8%B1%D8%AF%D8%A7%D9%86%D9%87.jpg'
            loading="lazy"
            alt='Slider 1'
            className='w-full h-full object-fill'
            />
        </SwiperSlide>
        <SwiperSlide >
            <img src='https://idehalmag.com/wp-content/uploads/2021/01/%D9%85%D8%B9%D8%B1%D9%81%DB%8C-%D8%A7%D9%86%D9%88%D8%A7%D8%B9-%D8%A7%D8%B3%D8%AA%D8%A7%DB%8C%D9%84-%D9%85%D8%B1%D8%AF%D8%A7%D9%86%D9%87.jpg'
            loading="lazy"
            alt='Slider 1'
            className='w-full h-full object-fill'
            />
        </SwiperSlide>
        <SwiperSlide >
            <img src='https://idehalmag.com/wp-content/uploads/2021/01/%D9%85%D8%B9%D8%B1%D9%81%DB%8C-%D8%A7%D9%86%D9%88%D8%A7%D8%B9-%D8%A7%D8%B3%D8%AA%D8%A7%DB%8C%D9%84-%D9%85%D8%B1%D8%AF%D8%A7%D9%86%D9%87.jpg'
            loading="lazy"
            alt='Slider 1'
            className='w-full h-full object-fill'
            />
        </SwiperSlide>
        <SwiperSlide >
            <img src='https://idehalmag.com/wp-content/uploads/2021/01/%D9%85%D8%B9%D8%B1%D9%81%DB%8C-%D8%A7%D9%86%D9%88%D8%A7%D8%B9-%D8%A7%D8%B3%D8%AA%D8%A7%DB%8C%D9%84-%D9%85%D8%B1%D8%AF%D8%A7%D9%86%D9%87.jpg'
            loading="lazy"
            alt='Slider 1'
            className='w-full h-full object-fill'
            />
        </SwiperSlide>
    </Swiper>
    </>
  )
}
