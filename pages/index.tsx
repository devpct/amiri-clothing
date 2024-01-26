import React from 'react'
import Head from "next/head";
import Slider from '@/components/templates/Home/Slider';
import Clothes from '@/components/templates/Home/Products';
import axios from 'axios';
import { useQuery } from 'react-query';

interface Index {
  data: any;
  error: any;
  isLoading: any;
}

const Index: React.FC<Index> =({ }) => {

  const { isLoading, data } = useQuery('Slider', () => 
  axios.get('https://amiri-clothing-server.liara.run/slider').then((res) => res.data)
  );

  if (isLoading) return <div>Loading...</div>

  return (
    <>
    <Head>
      <title>AMIRI - Home</title>
    </Head>
    <Slider data={data}/>
    <Clothes/>
    </>
  )
}

export default Index

export async function getStaticProps () {

  return {
    props:{

    },
  }
}