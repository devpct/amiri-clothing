import React from 'react';
import { useResizeDetector } from 'react-resize-detector';
import CartsData from '@/components/templates/Dashboard/Admin/Assessment/CartsData';
import Charts from '@/components/templates/Dashboard/Admin/Assessment/Charts';
import { useSelector } from "react-redux";

export default function Assessment({ usersData, productsData, categoriesData, cartData, commentsData, sliderData }) {

    const { width, ref } = useResizeDetector();

    return (
        <>
            <div className="pr-10 grid sm:mt-10" ref={ref}>
                <CartsData usersData={usersData} productsData={productsData} categoriesData={categoriesData} cartData={cartData} commentsData={commentsData} sliderData={sliderData} />
                <Charts width={width} usersData={usersData}/>
            </div>
        </>
    );
}
