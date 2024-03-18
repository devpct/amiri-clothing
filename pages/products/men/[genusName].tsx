import ProductCard from '@/components/templates/Products/ProductCards';
import Sidebar from '@/components/templates/Products/Sidebar';
import '@radix-ui/themes/styles.css';
import ProductsSettings from '@/components/templates/Products/ProductsSettings';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { startCase } from 'lodash';
import { setCategoryId } from '@/redux/actions';
import { useEffect } from 'react';

export default function GenusName({ productsData, categoriesData}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCategoryId(''));
  }, []);

  const selectedCategoryId = useSelector(state => state.selectedCategoryId);

  const { data: products } = useQuery('ProductsMen', () =>
    axios.get('http://localhost:4000/products').then(res => res.data),
    {
      initialData: productsData,
      staleTime: 900000,
      cacheTime: 900000,
    }
  );

  const { data: categories } = useQuery('CategoriesMen', () =>
    axios.get('http://localhost:4000/categories').then(res => res.data),
    {
      initialData: categoriesData,
      staleTime: 900000,
      cacheTime: 900000,
    }
  );

  return (
    <>
      <div className="flex">
        <Sidebar categoriesData={categories} />
        <div className="w-full">
          <h1 className='bg-white fixed z-50 font-bold lg:text-[3rem] text-[2rem] w-full h-fit py-2 pl-5 border-b-1'>
            {
              selectedCategoryId === '' ? 'All Products' : startCase(categories[+selectedCategoryId - selectedCategoryId].name)
            }
          </h1>
          <ProductsSettings categoriesData={categories} />
          <ProductCard productsData={products} />
        </div>
      </div>
    </>
  );
}
