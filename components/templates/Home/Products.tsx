import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import Card from '@/components/modules/Card'

export default function Products() {
  return (
    <>
    <section className="py-6 sm:py-12 dark:bg-gray-800 dark:text-gray-100">
	<div className="w-[70%] mx-auto p-6 space-y-8">

		<div className="space-y-2 text-center">
			<h2 className="text-3xl font-bold">Best Products</h2>
			<p className="font-serif text-sm dark:text-gray-400">All our products are valuable</p>
		</div>


		<div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
			<Card/>
			<Card/>
			<Card/>
			<Card/>
		</div>


        <div className="w-full text-center">
		<Link href='/products'>
        <Button style={{ backgroundColor: '#000', color: '#fff' }} className='rounded-lg w-[9rem] h-[3rem]'>
			Show all
		</Button>
		</Link>
        </div>

        </div>
</section>
    </>
  )
}
