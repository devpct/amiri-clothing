import ProductCard from '@/components/templates/Products/ProductCards'
import Sidebar from '@/components/templates/Products/Sidebar'
import '@radix-ui/themes/styles.css';
import ProductsSettings from '@/components/templates/Products/ProductsSettings';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { startCase } from 'lodash';

export default function index({ productsData, categoriesData }) {

  const selectedCategoryId = useSelector(state => state.selectedCategoryId);

  const { data:products } = useQuery('ProductsWomen', () =>
  axios.get('http://localhost:4000/products').then((res) => res.data),
  {
    initialData: productsData,
    staleTime: 900000,
    cacheTime: 900000,
  }
  )

  const { data:categories } = useQuery('CategoriesWomen', () =>
  axios.get('http://localhost:4000/categories').then((res) => res.data),
  {
    initialData: categoriesData,
    staleTime: 900000,
    cacheTime: 900000,
  }
  )


  return (
    <>
    <div className="flex">
      <Sidebar categoriesData={categories}/>
    <div className="w-full">
      <h1 className='bg-white fixed z-50 font-bold lg:text-[3rem] text-[2rem] w-full h-fit
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
  const productsData = await axios.get('http://localhost:4000/products').then((res) => res.data);
  const categoriesData = await axios.get('http://localhost:4000/categories').then((res) => res.data);
  
const categoriesWithoutWomen = categoriesData.filter(category => category.name.toLowerCase().includes('women'));

const categoriesWithoutWomenIds = categoriesWithoutWomen.map(category => category.id);

const productsWithoutWomen = productsData.filter(product =>
    categoriesWithoutWomenIds.includes(product.category_id));


  return {
    props: {
      productsData: productsWithoutWomen,
      categoriesData: categoriesWithoutWomen,
    },
  };
}
