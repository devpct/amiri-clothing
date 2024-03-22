import React, { useState } from 'react';
import Search from '@/components/modules/Dashboard/Admin/Search';
import Buttons from '@/components/modules/Dashboard/Admin/Buttons';
import Modal from '@/components/modules/Dashboard/Admin/Modal';
import Pagination from '@/components/modules/Dashboard/Admin/Pagination';
import Table from '@/components/modules/Dashboard/Admin/Table';
import axios from 'axios';

export default function Sliders({ slidersData }:{ slidersData:any }) {
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [image, setImage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const filteredSliders = slidersData?.filter(slider => {
    const searchTermLower = searchTerm.toLowerCase();
    const image = slider.image.toLowerCase();
    const imageMatch = image.includes(searchTermLower);
    return imageMatch;
  });
  
  
  const getSelectedCount = () => {
    return selected.length;
  };

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const current = filteredSliders?.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <section className="sm:container w-[90%] mx-auto sm:px-10 ">
        <div className="flex flex-wrap justify-center gap-7 items-center lg:justify-around">
          <div className='flex items-center gap-x-3'>
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Sliders</h2>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{slidersData?.length} Sliders</span>
          </div>

          <Search value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

          <Buttons 
          selected={selected} 
          setOpenModalAdd={setOpenModalAdd} 
          setOpenModalEdit={setOpenModalEdit} 
          setSelected={setSelected} data={slidersData} title={'sliders'}
          setImage={setImage}
          />
        </div>

        <Modal 
        openModalAdd={openModalAdd} 
        openModalEdit={openModalEdit} 
        setOpenModalAdd={setOpenModalAdd} 
        setOpenModalEdit={setOpenModalEdit} 
        image={image}
        setImage={setImage}
        selected={selected}
        title={'Sliders'}/>

        <Table data={current} selected={selected} setSelected={setSelected} 
        columnNames={['Image']} title={'sliders'}/>

        <p className="text-blue-500 w-full mt-2  text-right">
          Selected {getSelectedCount()}
        </p>

        <Pagination
          perPage={perPage}
          total={filteredSliders?.length}
          paginate={paginate}
        />

      </section>
    </>
  );
}