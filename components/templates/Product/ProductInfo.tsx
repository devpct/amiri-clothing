import React from 'react'
import Options from '@/components/modules/Product/Options/Options'
import Info from '@/components/modules/Product/Info'
import { startCase } from 'lodash';
import { setCartsQty, setShoppingCarts } from '@/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useQuery } from 'react-query';
import useSWR, { mutate } from 'swr';

export default function ProductInfo({ product, isLogin, cart }) {
  const dispatch = useDispatch();
  const shoppingCarts = useSelector(state => state.shoppingCarts);
  const cartsQty = useSelector(state => state.cartsQty);

    const { data: userInfo } = useQuery('UserInfo', () =>
    axios.get('/api/auth/info').then((res) => res.data))

    const { data: cartItems } = useSWR('Cart', () =>
    axios.get('http://localhost:4000/cart').then((res) => res.data)
    );

    const handleShoppingCarts = async (color, size) => {
      const productAlreadyInCart = cartItems.find(
        cartItem => cartItem.product_id === +product.id
        );
    
      if (!productAlreadyInCart) {
        dispatch(setCartsQty(cartsQty + 1));
        await axios.post('http://localhost:4000/cart', {
          customer_id: userInfo.id,
          product_id: +product.id,
          color_name: color.name,
          size: size.name,
          qty: 1,
        });
    
        mutate('Cart');
        if (!shoppingCarts) {
          dispatch(setShoppingCarts(true));
        }
      } else {
        console.log('Product is already in the cart');
        // انجام عملیاتی در صورتی که محصول قبلاً به سبد خرید اضافه شده است
      }
    };
    

  return (
    <>
    <div className="w-full px-4 pt-10 sm:px-6 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-10">

          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {startCase(product.name)}
            </h1>
          </div>

          <Options product={product} isLogin={isLogin} cart={cart} handleShoppingCarts={handleShoppingCarts} />
          <Info product={product}/>

        </div>
    </>
  )
}