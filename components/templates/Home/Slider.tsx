import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";
import Image from 'next/image';

interface Slider {
  data: any;
}

interface sliderData {
  id: number;
  image: string;
}


const Slider: React.FC<Slider> =({ data }) => {
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
      {
        data.map((slider:sliderData) => (
          <SwiperSlide key={slider.id}>
          <Image 
          src={slider.image}
          alt=''             
          className='w-full h-full object-fill dark:brightness-[.85]'
          width={500}
          height={500}
          quality={100}
          />
          </SwiperSlide>
        ))
      }
    </Swiper>
    </>
  )
}


export default Slider