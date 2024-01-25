import React from 'react'
import Head from "next/head";
import Slider from '@/components/templates/Home/Slider';
import Clothes from '@/components/templates/Home/Products';


export default function index() {
  return (
    <>
    <Head>
      <title>AMIRI - Home</title>
    </Head>
    <Slider/>
    <Clothes/>
    </>
  )
}
