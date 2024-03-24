import React, { useEffect } from 'react';
import Slider from '@/components/templates/Home/Slider';
import Clothes from '@/components/templates/Home/Products';
import {localhostDatabase} from '@/localhost';
import { useQuery } from 'react-query';
import { toast, Bounce } from 'react-toastify';
import axios from 'axios';

interface IndexProps {
  sliderData: any;
  productsData:any;
}

const Index: React.FC<IndexProps> = ({ sliderData, productsData }) => {
  const { data } = useQuery('Slider', () =>
    axios.get(`${localhostDatabase}/slider`).then((res) => res.data),
    {
      initialData: sliderData,
      staleTime: 900000,
      cacheTime: 900000,
    }
  )

  useEffect(() => {
    const toastType = localStorage.getItem('toast');
  
    if (toastType === 'signup') {
      toast.success('Registration was successful ((:', {
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
    } else if (toastType === 'login') {
      toast.success('You have successfully logged into your account', {
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
  
    localStorage.removeItem('toast');
  }, []);
  
    
  return (
    <>
      <Slider data={data} />
      <Clothes productsData={productsData} />
    </>
  );
};

export default Index;

export async function getStaticProps() {
  const sliderData = await axios.get(`${localhostDatabase}/slider`).then((res) => res.data)
  
  const productsData = await axios.get(`${localhostDatabase}/products`).then((res) => res.data)

  return {
    props: {
      sliderData,
      productsData
    },
  };
}
