import React, { useState } from 'react';
import Search from '@/components/modules/Dashboard/Admin/Search';
import Buttons from '@/components/modules/Dashboard/Admin/Buttons';
import Modal from '@/components/modules/Dashboard/Admin/Modal';
import Pagination from '@/components/modules/Dashboard/Admin/Pagination';
import Table from '@/components/modules/Dashboard/Admin/Table';
import axios from 'axios';

export default function Categories({ categoriesData }:{ categoriesData:any }) {
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const filteredCategories = categoriesData?.filter(category => {
    const searchTermLower = searchTerm.toLowerCase();
    const categoryName = category.name.toLowerCase();
    const nameMatch = categoryName.includes(searchTermLower);
    const idMatch = category.id.toString().includes(searchTermLower);
    return nameMatch ||idMatch ;
  });
  
  
  const getSelectedCount = () => {
    return selected.length;
  };

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const current = filteredCategories?.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <section className="sm:container w-[90%] mx-auto sm:px-10 ">
        <div className="flex flex-wrap justify-center gap-7 items-center lg:justify-around">
          <div className='flex items-center gap-x-3'>
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Categories</h2>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{categoriesData?.length} Categories</span>
          </div>

          <Search value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

          <Buttons 
          selected={selected} 
          setOpenModalAdd={setOpenModalAdd} 
          setOpenModalEdit={setOpenModalEdit} 
          setSelected={setSelected} data={categoriesData} title={'categories'}
          setCategoryId={setCategoryId}
          setCategoryName={setCategoryName}
          />
        </div>

        <Modal 
        openModalAdd={openModalAdd} 
        openModalEdit={openModalEdit} 
        setOpenModalAdd={setOpenModalAdd} 
        setOpenModalEdit={setOpenModalEdit} 
        categoryName={categoryName}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        setCategoryName={setCategoryName}
        selected={selected}
        categoriesData={categoriesData}
        title={'Categories'}/>

        <Table data={current} selected={selected} setSelected={setSelected} 
        columnNames={['CategoryId','CategoryName']} title={'categories'}/>

        <p className="text-blue-500 w-full mt-2  text-right">
          Selected {getSelectedCount()}
        </p>

        <Pagination
          perPage={perPage}
          total={filteredCategories?.length}
          paginate={paginate}
        />

      </section>
    </>
  );
}