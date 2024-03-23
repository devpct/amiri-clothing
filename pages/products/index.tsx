import ProductCard from '@/components/templates/Products/ProductCards'
import Sidebar from '@/components/templates/Products/Sidebar'
import '@radix-ui/themes/styles.css';
import ProductsSettings from '@/components/templates/Products/ProductsSettings';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { startCase } from 'lodash';
import localhostBackend from '@/localhost';

export default function index({ productsData, categoriesData }:{productsData:any,categoriesData:any}) {

  const selectedCategoryId = useSelector((state:any) => state.selectedCategoryId);

  const { data:products } = useQuery('Products', () =>
  axios.get(`${localhostBackend}/products`).then((res) => res.data),
  {
    initialData: productsData,
    staleTime: 900000,
    cacheTime: 900000,
  }
  )

  const { data:categories } = useQuery('Categories', () =>
  axios.get(`${localhostBackend}/categories`).then((res) => res.data),
  {
    initialData: categoriesData,
    staleTime: 900000,
    cacheTime: 900000,
  }
  )


  return (
    <>
    <div className="flex ">
      <Sidebar categoriesData={categories}/>
    <div className="w-full ">
      <h1 className='bg-white dark:bg-gray-900 fixed z-30 font-bold lg:text-[3rem] text-[2rem] w-full h-fit
      py-2 pl-5 border-b-1'>
        {
          selectedCategoryId === '' ? 'All Products' : startCase(categories[+selectedCategoryId-1].name)
        }
      </h1>
      <ProductsSettings categoriesData={categories}/>
      <ProductCard productsData={products}/>
    </div>
    </div>
    </>
  )
}


export async function getStaticProps() {
  const productsData = await axios.get(`${localhostBackend}/products`).then((res) => res.data)
  const categoriesData = await axios.get(`${localhostBackend}/categories`).then((res) => res.data)
  
  return {
    props: {
      productsData,
      categoriesData
    },
  };
}