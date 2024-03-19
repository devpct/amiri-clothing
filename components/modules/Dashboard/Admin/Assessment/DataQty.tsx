import React from 'react'

export default function DataQty({icon, title, qty, darkMode }) {
  return (
    <>
        <div className="text-white dark:text-black bg-black dark:bg-white w-[10rem] p-5 text-center rounded-[25px] grid gap-y-2">
        <svg className='m-auto' width="50" height="50" fill="none" stroke={darkMode?'black':'white'} stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {icon}
        </svg>
        <p className="font-bold text-[1.3rem]">{title}</p>
        <p className="rounded-full mt-5 py-1 font-bold text-[1.3rem]">{qty}</p>
        </div>
    </>
  )
}
