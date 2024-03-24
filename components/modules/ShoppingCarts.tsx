import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import { setShoppingCarts, setCartsQty } from '@/redux/actions';
import { useQuery } from 'react-query';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import { localhostDatabase, localhostBackend } from '@/localhost';
import Image from 'next/image';

export default function ShoppingCarts() {
  const { data: products } = useQuery('Products', () =>
    axios.get(`${localhostDatabase}/products`).then((res) => res.data)
  );

  const { data: userInfo } = useQuery('UserInfo', () =>
  axios.get(`${localhostBackend}/api/auth/info`).then((res) => res.data))

  const { data: cartItems } = useSWR('Cart', () =>
    axios.get(`${localhostDatabase}/cart`).then((res) => res.data)
  );

  
  const dispatch = useDispatch();
  const shoppingCarts = useSelector((state:any) => state.shoppingCarts);
  const cartsQty = useSelector((state:any) => state.cartsQty);

  useEffect(() => {
    if (userInfo) {
      const totalQuantity = cartItems.filter(item => item.customer_id === userInfo.id);
      dispatch(setCartsQty(totalQuantity.length));
    }

  }, [userInfo]);

  const totalPrice = cartItems?.reduce((accumulator, item) => {
    if (item.customer_id === userInfo?.id) {
      const product = products?.find((p) => p.id.toString() === item.product_id.toString());
      if (product) {
        return accumulator + (product.price * item.qty);
      }
    }
    return accumulator;
  }, 0);

  const handleCloseShoppingCarts = () => {
    dispatch(setShoppingCarts(false));
  };

  const handleIncrement = async (itemId,item) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.product_id === itemId) {
        return { ...item, qty: item.qty + 1 }
      }
      return item;
    });

    await axios.put(`${localhostDatabase}/cart/${item.id}`, { ...item, qty: updatedCartItems.find((item) => item.product_id === itemId).qty });

    mutate('Cart', updatedCartItems);
  };

  const handleDecrement = async (itemId,item) => {            
    const updatedCartItems = cartItems.map((item) => {
      if (item.product_id === itemId && item.qty > 1) {
        return { ...item, qty: item.qty - 1 }
      }
      return item;
    });
  
      await axios.put(`${localhostDatabase}/cart/${item.id}`, { ...item, qty: updatedCartItems.find(item => item.product_id === itemId).qty });
            
      mutate('Cart', updatedCartItems);
  };

  const handleRemove = async (itemId) => {
    dispatch(setCartsQty(cartsQty - 1))
    const updatedCartItems = cartItems.filter(item => item.product_id !== itemId);
  
    await axios.delete(`${localhostDatabase}/cart/${itemId}`);
  
    mutate('Cart', updatedCartItems);
  };
  
  const handleCheckout = async () => {
    try {
      for (const item of cartItems) {
        if (item.customer_id === userInfo?.id) {
          const orderData = {
            customer_id: item.customer_id,
            product_id: item.product_id,
            color_name: item.color_name,
            size: item.size,
            qty: item.qty,
            status: "preparing"
          };
          
          await axios.post(`${localhostDatabase}/order`, orderData);
        }
      }
  
      const userCartItems = cartItems.filter(item => item.customer_id === userInfo?.id);
      const deleteRequests = userCartItems.map(item => axios.delete(`${localhostDatabase}/cart/${item.id}`));
      await Promise.all(deleteRequests);
  
      mutate('Cart', []);
      dispatch(setCartsQty(0));
      handleCloseShoppingCarts();
  
      console.log('Order placed successfully');
    } catch (error) {
      console.error('Error while placing order:', error);
    }
  };
  
  
  return (
    <Transition.Root show={shoppingCarts} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={handleCloseShoppingCarts} onClick={handleCloseShoppingCarts}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed  inset-0 overflow-hidden">
          <div className="absolute  inset-0 overflow-hidden">
            <div className=" pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="bg-white flex fixed bottom-0 right-0 h-[94%] flex-col overflow-y-scroll shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={handleCloseShoppingCarts}
                          >
                            <span className="absolute -inset-0.5" />
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartItems?.map(item => {
                              const product = products?.find(p => p.id.toString() === item.product_id.toString());
                              return item.customer_id === userInfo?.id ? (
                                <li key={item.product_id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Image 
                                      src={ product?.images[0] } 
                                      alt={product?.name}
                                      className="h-full w-full object-cover object-center"
                                      width={500}
                                      height={500}
                                      quality={100}
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a className="line-clamp-1" href={product?.href}>{product?.name}</a>
                                        </h3>
                                        <p className="ml-4">${Number(product?.price).toLocaleString()}</p>
                                      </div>
                                      <div className="flex justify-between">
                                      <p className="mt-1 text-sm text-gray-500">{item.color_name}</p>
                                      <p className="mt-1 text-sm text-gray-500">{item.size}</p>
                                      </div>
                                    </div>
                                    <div className="flex mt-5 items-center justify-between text-sm">
                                      <div className='flex items-center'>
                                      <button onClick={() => handleDecrement(item.product_id,item)} type="button" className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-decrement>
                                          <svg className="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
                                        </button>
                                        <p className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white select-none" data-hs-input-number-input>{item.qty}</p>
                                        <button onClick={() => handleIncrement(item.product_id,item)}  type="button" className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-increment>
                                          <svg className="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                                        </button>
                                      </div>
                                      <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-black hover:text-gray-700"
                                        onClick={() => handleRemove(item.id)}
                                      >
                                          <svg width="28" fill="#ff0000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M20.25 4.5h-4.5V3.375A1.875 1.875 0 0 0 13.875 1.5h-3.75A1.875 1.875 0 0 0 8.25 3.375V4.5h-4.5a.75.75 0 0 0 0 1.5h.797l.89 14.293c.067 1.259 1.032 2.207 2.25 2.207h8.625c1.225 0 2.17-.927 2.25-2.203L19.453 6h.797a.75.75 0 1 0 0-1.5Zm-11.223 15H9a.75.75 0 0 1-.75-.723l-.375-10.5a.75.75 0 0 1 1.5-.054l.375 10.5a.75.75 0 0 1-.723.777Zm3.723-.75a.75.75 0 1 1-1.5 0V8.25a.75.75 0 1 1 1.5 0v10.5Zm1.5-14.25h-4.5V3.375A.37.37 0 0 1 10.125 3h3.75a.371.371 0 0 1 .375.375V4.5Zm1.5 14.277a.75.75 0 0 1-.75.723h-.027a.75.75 0 0 1-.723-.777l.375-10.5a.75.75 0 0 1 1.5.054l-.375 10.5Z"></path>
                                        </svg>
                                      </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ): null
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${Number(totalPrice).toLocaleString()}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <button
                        className="flex items-center justify-center rounded-md border border-transparent bg-black text-white px-6 py-3 text-base font-medium  shadow-sm w-full"
                        onClick={handleCheckout}
                      >
                        Checkout
                      </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-black hover:text-gray-900"
                            onClick={handleCloseShoppingCarts}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
