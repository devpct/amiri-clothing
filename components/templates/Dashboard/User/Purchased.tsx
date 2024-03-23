import React from 'react';
import Card from '@/components/modules/Dashboard/User/Purchased/Card';

export default function Purchased({ userData, productsData, ordersData }:{ userData:any, productsData:any, ordersData:any }) {
  const userOrders = ordersData.filter((order:any) => order.customer_id === userData.id);

  return (
<>
  <div className='flex sm:gap-10 gap-5 sm:p-10 p-4 flex-col sm:flex-row'>
  {userOrders.map((order:any) => (
    productsData.find((product:any) => product.id == order.product_id) ? (
      <Card key={order.id} product={productsData.find((product:any) => product.id == order.product_id)} order={order} />
      ) : null
  ))}
  </div>
</>

  );
}
