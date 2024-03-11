import React, { useState } from 'react';
import Search from '@/components/modules/Admin/Search';
import Buttons from '@/components/modules/Admin/Buttons';
import Modal from '@/components/modules/Admin/Modal';
import Pagination from '@/components/modules/Admin/Pagination';
import Table from '@/components/modules/Admin/Table';

export default function Orders({ ordersData }) {
    const [selected, setSelected] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [customerId, setCustomerId] = useState('');
    const [productId, setProductId] = useState(1);
    const [colorName, setColorName] = useState('');
    const [size, setSize] = useState('');
    const [qty, setQty] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 6;
  
    const filteredOrders = ordersData?.filter(order => {
      const searchTermLower = searchTerm.toLowerCase();
      const customerId = order.customer_id.toLowerCase();
      const customerIdMatch = customerId.includes(searchTermLower);
      const colorName = order.color_name.toLowerCase();
      const colorNameMatch = colorName.includes(searchTermLower);
      return customerIdMatch || colorNameMatch;
    });
    
    
    const getSelectedCount = () => {
      return selected.length;
    };
  
    const indexOfLast = currentPage * perPage;
    const indexOfFirst = indexOfLast - perPage;
    const current = filteredOrders?.slice(indexOfFirst, indexOfLast);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    return (
      <>
        <section className="sm:container w-[90%] mx-auto sm:px-10 ">
          <div className="flex flex-wrap justify-center gap-7 items-center lg:justify-around">
            <div className='flex items-center gap-x-3'>
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">Orders</h2>
              <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{ordersData?.length} Orders</span>
            </div>
  
            <Search value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
  
            <Buttons 
            selected={selected} 
            setOpenModalAdd={setOpenModalAdd} 
            setOpenModalEdit={setOpenModalEdit} 
            setSelected={setSelected} data={ordersData} title={'orders'}
            setCustomerId={setCustomerId}
            setProductId={setProductId}
            setColorName={setColorName}
            setQty={setQty}
            setSize={setSize}
            />
          </div>
  
          <Modal 
          openModalAdd={openModalAdd} 
          openModalEdit={openModalEdit} 
          setOpenModalAdd={setOpenModalAdd} 
          setOpenModalEdit={setOpenModalEdit} 
          customerId={customerId}
          productId={productId}
          colorName={colorName}
          qty={qty}
          size={size}
          setCustomerId={setCustomerId}
          setProductId={setProductId}
          setColorName={setColorName}
          setQty={setQty}
          setSize={setSize}
          selected={selected}
          title={'Orders'}/>
  
          <Table data={current} selected={selected} setSelected={setSelected} 
          columnNames={['Customer Id','Product Id','Color Name','Size','Qty']} title={'orders'}/>
  
          <p className="text-blue-500 w-full mt-2  text-right">
            Selected {getSelectedCount()}
          </p>
  
          <Pagination
            perPage={perPage}
            total={filteredOrders?.length}
            paginate={paginate}
          />
  
        </section>
      </>
  )
}
