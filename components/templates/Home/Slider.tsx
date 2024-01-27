import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";

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
        data?.map((slider:sliderData) => (
          <SwiperSlide key={slider.id}>
            <img src={slider.image}
            loading="lazy"
            alt='Slider 1'
            className='w-full h-full object-fill'
            />
          </SwiperSlide>
        ))
      }
    </Swiper>
    </>
  )
}


export default Slider