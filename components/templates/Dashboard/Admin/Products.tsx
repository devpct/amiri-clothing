import React, { useState } from 'react';
import Search from '@/components/modules/Admin/Search';
import Buttons from '@/components/modules/Admin/Buttons';
import Modal from '@/components/modules/Admin/Modal';
import Pagination from '@/components/modules/Admin/Pagination';
import Table from '@/components/modules/Admin/Table';
import axios from 'axios';

export default function Products({ productsData, categoriesData }) {
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [productName, setProductName] = useState('');
  const [colors, setColors] = useState([]);
  const [colorsCode, setColorsCode] = useState([]);
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [size, setSize] = useState([]);
  const [categoryId, setCategoryId] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const filteredProducts = productsData?.filter(product => {
    const searchTermLower = searchTerm.toLowerCase();
    const productName = product.name.toLowerCase();
    const nameMatch = productName.includes(searchTermLower);
    const colors = product.colors.map(color => color.toLowerCase());
    const colorMatch = colors.some(color => color.toLowerCase() === searchTermLower);
    const priceMatch = product.price.toString().includes(searchTermLower);
    return nameMatch || colorMatch || priceMatch ;
  });
  
  
  const getSelectedCount = () => {
    return selected.length;
  };

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const current = filteredProducts?.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <section className="sm:container w-[90%] mx-auto sm:px-10 ">
        <div className="flex flex-wrap justify-center gap-7 items-center lg:justify-around">
          <div className='flex items-center gap-x-3'>
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Products</h2>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{productsData?.length} Products</span>
          </div>

          <Search value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

          <Buttons 
          selected={selected} 
          setOpenModalAdd={setOpenModalAdd} 
          setOpenModalEdit={setOpenModalEdit} 
          setSelected={setSelected} data={productsData} title={'products'}
          setProductName={setProductName}
          setColors={setColors}
          setColorsCode={setColorsCode}
          setPrice={setPrice}
          setImages={setImages}
          setDescription={setDescription}
          setSize={setSize}
          setCategoryId={setCategoryId}
          />
        </div>

        <Modal 
        openModalAdd={openModalAdd} 
        openModalEdit={openModalEdit} 
        setOpenModalAdd={setOpenModalAdd} 
        setOpenModalEdit={setOpenModalEdit} 
        productName={productName}
        colors={colors}
        colorsCode={colorsCode}
        price={price}
        images={images}
        description={description}
        size={size}
        categoryId={categoryId}
        setProductName={setProductName}
        setColors={setColors}
        setColorsCode={setColorsCode}
        setPrice={setPrice}
        setImages={setImages}
        setDescription={setDescription}
        setSize={setSize}
        setCategoryId={setCategoryId}
        selected={selected}
        categoriesData={categoriesData}
        title={'Product'}/>

        <Table data={current} selected={selected} setSelected={setSelected} 
        columnNames={['Name','Colors','Price','Images','Description','size','CategoryId']} title={'products'}/>

        <p className="text-blue-500 w-full mt-2  text-right">
          Selected {getSelectedCount()}
        </p>

        <Pagination
          perPage={perPage}
          total={filteredProducts?.length}
          paginate={paginate}
        />

      </section>
    </>
  );
}