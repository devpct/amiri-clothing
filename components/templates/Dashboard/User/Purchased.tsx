import React from 'react';
import Card from '@/components/modules/Dashboard/User/Purchased/Card';

export default function Purchased({ userData, productsData, ordersData }) {
  const userOrders = ordersData.filter(order => order.customer_id === userData.id);

  return (
<>
  <div className='flex sm:gap-10 gap-5 sm:p-10 p-4 flex-col sm:flex-row'>
  {userOrders.map(order => (
    productsData.find(product => product.id == order.product_id) ? (
      <Card key={order.id} product={productsData.find(product => product.id == order.product_id)} order={order} />
      ) : null
  ))}
  </div>
</>

  );
}
