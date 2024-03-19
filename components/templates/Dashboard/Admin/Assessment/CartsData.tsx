import React from 'react'
import DataQty from '@/components/modules/Dashboard/Admin/Assessment/DataQty';

export default function CartsData({ usersData, productsData, categoriesData, cartData, commentsData, sliderData, darkMode }) {
  return (
    <>
    <div className=" sm:pl-10 pl-6  grid grid-cols-2 w-full sm:flex flex-wrap justify-center gap-y-3  gap-x-10">
        <DataQty 
            icon={<><path d="M9 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8z"></path><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path></>} 
            title={'Users'} 
            qty={usersData.length}
            darkMode={darkMode}
            />

            <DataQty 
            icon={<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><path d="M12 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8z"></path></>} 
            title={'Customers'} 
            qty={usersData.filter(user => user.role === 'customer').length}
            darkMode={darkMode}
            />

            <DataQty 
            icon={<><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><path d="M8.5 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8z"></path><path d="m17 11 2 2 4-4"></path></>} 
            title={'Admins'} 
            qty={usersData.filter(user => user.role === 'admin').length}
            darkMode={darkMode}
            />

            <DataQty 
            icon={<>  <path d="m16.5 9.4-9-5.19"></path><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><path d="M3.27 6.96 12 12.01l8.73-5.05"></path><path d="M12 22.08V12"></path></>} 
            title={'Products'} 
            qty={productsData.length}
            darkMode={darkMode}
            />

            <DataQty 
            icon={<><path d="M17 10H3"></path><path d="M21 6H3"></path><path d="M21 14H3"></path><path d="M17 18H3"></path></>} 
            title={'Categories'} 
            qty={categoriesData.length}
            darkMode={darkMode}
            />

            <DataQty 
            icon={<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></>} 
            title={'Comments'} 
            qty={commentsData.length}
            darkMode={darkMode}
            />

            <DataQty 
            icon={<><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path></>} 
            title={'Sliders'} 
            qty={sliderData.length}
            darkMode={darkMode}
            />

            <DataQty 
            icon={<><path d="M9 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z"></path><path d="M20 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z"></path><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></>} 
            title={'Cart'} 
            qty={cartData.length}
            darkMode={darkMode}
            />
    </div>
    </>
  )
}
