import React from 'react';
import Head from 'next/head';
import Slider from '@/components/templates/Home/Slider';
import Clothes from '@/components/templates/Home/Products';
import { useQuery } from 'react-query';
import axios from 'axios';

interface IndexProps {
  sliderData: any;
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

  return (
    <>
      <Head>
        <title>AMIRI - Home</title>
      </Head>
      <Slider data={data} />
      <Clothes />
    </>
  );
};

export default Index;

export async function getStaticProps() {
  const sliderData = await axios.get('https://amiri-clothing-server.liara.run/slider').then((res) => res.data)

  return {
    props: {
      sliderData,
    },
  };
}
