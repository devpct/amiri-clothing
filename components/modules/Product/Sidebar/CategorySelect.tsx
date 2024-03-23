import React, { useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { startCase } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '@/redux/actions';

export default function CategorySelect({ categoriesData }:{ categoriesData:any }) {

  const dispatch = useDispatch();
  const selectedCategoryId = useSelector((state:any) => state.selectedCategoryId);

  const handleChange = (event:any) => {    
    dispatch(setCategoryId(event.target.value));
  };
  
  return (
    <>
    <FormControl className='w-full '>
        <Select
          value={selectedCategoryId}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          className='bg-white'
        >
          <MenuItem value="">
            <em>All Products</em>
          </MenuItem>
          {
            categoriesData?.map((category:{id:any,name:any}) => (
              <MenuItem key={category.id} value={category.id}>{startCase(category.name)}</MenuItem>
            ))
          }
        </Select>
    </FormControl>
    </>
  )
}

