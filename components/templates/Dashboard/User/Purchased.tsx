import React from 'react';
import Card from '@/components/modules/Dashboard/User/Purchased/Card';

export default function Purchased({ userData, productsData, ordersData }) {
  // انتخاب سفارشات کاربر
  const userOrders = ordersData.filter(order => order.user_id === userData.id);

  // ری ترن بر روی سفارشات کاربر
  return (
    <>
      {userOrders.map(order => (
        // ری ترن بر روی محصولات هر سفارش
        order.products.map(productID => {
          // پیدا کردن محصول متناظر با آیدی محصول
          const product = productsData.find(product => product.id === productID);
          // ایجاد کارت برای محصول
          <Card key={product.id} product={product} order={order} />;
        })
      ))}
    </>
  );
}
