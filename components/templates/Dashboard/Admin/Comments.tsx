import React, { useState } from 'react';
import Search from '@/components/modules/Dashboard/Admin/Search';
import Buttons from '@/components/modules/Dashboard/Admin/Buttons';
import Modal from '@/components/modules/Dashboard/Admin/Modal';
import Pagination from '@/components/modules/Dashboard/Admin/Pagination';
import Table from '@/components/modules/Dashboard/Admin/Table';
import axios from 'axios';

export default function Comments({ commentsData }:{ commentsData:any }) {
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [text, setText] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [productId, setProductId] = useState(1);
  const [like, setLike] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const filteredComments = commentsData?.filter(comment => {
    const searchTermLower = searchTerm.toLowerCase();
    const text = comment.text.toLowerCase();
    const textMatch = text.includes(searchTermLower);
    const customerId = comment.customer_id.toString().includes(searchTermLower);
    const productId = comment.product_id.toString().includes(searchTermLower);
    const like = comment.like.toString().includes(searchTermLower);
    return textMatch || customerId || productId || like ;
  });
  
  
  const getSelectedCount = () => {
    return selected.length;
  };

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const current = filteredComments?.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <section className="sm:container w-[90%] mx-auto sm:px-10 ">
        <div className="flex flex-wrap justify-center gap-7 items-center lg:justify-around">
          <div className='flex items-center gap-x-3'>
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Comments</h2>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{commentsData?.length} Comments</span>
          </div>

          <Search value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

          <Buttons 
          selected={selected} 
          setOpenModalAdd={setOpenModalAdd} 
          setOpenModalEdit={setOpenModalEdit} 
          setSelected={setSelected} data={commentsData} title={'comments'}
          setText={setText}
          setCustomerId={setCustomerId}
          setProductId={setProductId}
          setLike={setLike}
          />
        </div>

        <Modal 
        openModalAdd={openModalAdd} 
        openModalEdit={openModalEdit} 
        setOpenModalAdd={setOpenModalAdd} 
        setOpenModalEdit={setOpenModalEdit}
        text={text}
        customerId={customerId}
        productId={productId}
        like={like}
        setText={setText}
        setCustomerId={setCustomerId}
        setProductId={setProductId}
        setLike={setLike}
        selected={selected}
        title={'Comments'}/>

        <Table data={current} selected={selected} setSelected={setSelected} 
        columnNames={['Customer Id','Product Id','Text','Like']} title={'comments'}/>

        <p className="text-blue-500 w-full mt-2  text-right">
          Selected {getSelectedCount()}
        </p>

        <Pagination
          perPage={perPage}
          total={filteredComments?.length}
          paginate={paginate}
        />

      </section>
    </>
  );
}