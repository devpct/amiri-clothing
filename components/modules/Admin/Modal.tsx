import React from 'react'
import {Box, FormControl, MenuItem, Modal, Select } from '@mui/material';
import Input from '@/components/modules/Input'
import axios from 'axios';
import { mutate } from 'swr';

export default function UsersModal({ openModalAdd, openModalEdit, setOpenModalEdit, setOpenModalAdd, setFullName, setEmail, setAddress, setPassword, setPhoneNumber, setRole, fullname, phoneNumber, email, password, address, role, title, productName, colors, colorsCode, price, images, description, size, categoryId, setProductName, setColors, setColorsCode, setPrice, setImages, setDescription, setSize, setCategoryId, selected, categoriesData}) {
    const handleClose = () => {
        if(title === 'User'){
        setFullName('');
        setEmail('');
        setPassword('');
        setPhoneNumber('');
        setAddress('');
        }else if (title === 'Product'){
        setProductName('');
        setColors([]);
        setColorsCode([]);
        setPrice('');
        setImages('')
        setDescription('')
        setSize([])
        setCategoryId(1)
        }
        setOpenModalAdd(false);
      };
      const add = async () => {
        
        if(title === 'User'){
        await axios.post('http://localhost:4000/users', {
          fullname,
          email,
          password,
          phonenumber : phoneNumber,
          address,
          role,
        });
    
        mutate('Users')
    
        setFullName('')
        setEmail('')
        setPassword('')
        setPhoneNumber('')
        setAddress('')
        }else if (title === 'Product'){
            await axios.post('http://localhost:4000/products', {
                name: productName,
                colors,
                colors_code: colorsCode,
                price,
                images,
                description,
                size,
                category_id: categoryId,
              });
          
              mutate('Products')
          
              setProductName('');
              setColors([]);
              setColorsCode([]);
              setPrice('');
              setImages('')
              setDescription('')
              setSize([])
              setCategoryId(1)
        }
        setOpenModalAdd(false)
      }
      const update = async () => {
        if(title === 'User'){
        await axios.put(`http://localhost:4000/users/${selected[0]}`, {
          fullname,
          email,
          password,
          phonenumber: phoneNumber,
          address,
          role,
        });
      
        mutate('Users');
      
        setFullName('');
        setEmail('');
        setPassword('');
        setPhoneNumber('');
        setAddress('');
        }else if (title === 'Product'){
            await axios.put(`http://localhost:4000/products/${selected[0]}`, {
                name: productName,
                colors,
                colors_code: colorsCode,
                price,
                images,
                description,
                size,
                category_id: categoryId,
              });
            
              mutate('Products');
            
              setProductName('');
              setColors([]);
              setColorsCode([]);
              setPrice('');
              setImages('')
              setDescription('')
              setSize([])
              setCategoryId(1)
        }
        setOpenModalEdit(false);
      };
  return (
    <>
     <Modal
        open={openModalAdd}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',bgcolor: 'background.paper',boxShadow: 24,p: 3,}} 
        className="rounded-[10px] lg:w-[800px] w-[90%] lg:h-fit  h-[70%] overflow-y-auto"
        >
        <div className="flex justify-between items-center w-full mb-3">
        <h3 className="font-bold text-[1.5rem] text-gray-800 dark:text-white">
            Add {title}
        </h3>
        <button type="button" className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-focus-management-modal" onClick={handleClose}>
            <span className="sr-only">Close</span>
            <svg className="flex-shrink-0 size-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        </div>
        <hr/>
        <div className="flex mt-5 flex-col gap-y-5">
        {
        title === 'User' ?
        <div className="mt-5 lg:grid grid-cols-2 gap-y-6 gap-x-8 flex flex-col">
        <Input 
        label='Full Name' 
        placeholder='Enter full name to get started'
        onChange={()=> setFullName(event.target.value)}
        value={fullname}
        />
        <Input 
        label='Email' 
        placeholder='Enter email to get started'
        onChange={()=> setEmail(event.target.value)}
        value={email}
        />
        <Input 
        label='Password' 
        placeholder='Enter password to get started'
        onChange={()=> setPassword(event.target.value)}
        value={password}
        />
        <Input 
        label='Phone Number' 
        placeholder='Enter phone number to get started'
        onChange={()=> setPhoneNumber(event.target.value)}
        value={phoneNumber}
        />
        <Input 
        label='Address' 
        placeholder='Enter address to get started'
        onChange={()=> setAddress(event.target.value)}
        value={address}
        />

        <div className="flex flex-col ">
        <label  className="text-base font-medium text-gray-900">Role</label>
        <FormControl className='mt-3'>
        <Select
        value={role}
        displayEmpty
        onChange={(event) => setRole(event.target.value)}
        inputProps={{ 'aria-label': 'Without label' }}
        >
        
        <MenuItem value='customer'>Customer</MenuItem>
        <MenuItem  value='admin'>Admin</MenuItem>

        </Select>
    </FormControl>
    </div>
    </div>
    : title === 'Product' ?
    <div className="lg:grid grid-cols-2 gap-y-6 gap-x-8 flex flex-col">
    <Input 
    label='Product Name' 
    placeholder='Enter product name to get started'
    onChange={()=> setProductName(event.target.value)}
    value={productName}
    />
    <Input 
    label='Colors' 
    placeholder='Enter colors to get started'
    onChange={(event) => setColors(event.target.value.split(','))}
    value={colors.join(',')}
    />
    <Input 
    label='Colors Code' 
    placeholder='Enter colors code to get started'
    onChange={()=> setColorsCode(event.target.value.split(','))}
    value={colorsCode.join(',')}
    />
    <Input 
    label='Price' 
    placeholder='Enter price to get started'
    onChange={()=> setPrice(event.target.value)}
    value={price}
    />
    <Input 
    label='Image' 
    placeholder='Enter image to get started'
    onChange={()=> setImages(event.target.value)}
    value={images}
    />
    <Input 
    label='Size' 
    placeholder='Enter size to get started'
    onChange={()=> setSize(event.target.value.split(','))}
    value={size.join(',')}
    />
    <Input 
    label='Description' 
    placeholder='Enter description to get started'
    onChange={()=> setDescription(event.target.value)}
    value={description}
    />

    <div className="flex flex-col ">
    <label  className="text-base font-medium text-gray-900">CategoryId</label>
    <FormControl className='mt-3'>
    <Select
    value={categoryId}
    displayEmpty
    onChange={(event) => setCategoryId(event.target.value)}
    inputProps={{ 'aria-label': 'Without label' }}
    >
    {
        categoriesData.map(category => (
            <MenuItem value={category.id}>{category.id}</MenuItem>
        ))
    }
    </Select>
    </FormControl>
    </div>
    </div>
    :null
    }

        <div className="flex justify-end items-center gap-x-2 ">
        <button onClick={handleClose} type="button" className="py-3 px-5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-focus-management-modal">
            Close
        </button>
        <button onClick={add} type="button" className="py-3 px-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-600 text-white hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            Save changes
        </button>
        </div>
        </div>
        </Box>
    </Modal>
    <Modal
        open={openModalEdit}
        onClose={()=>setOpenModalEdit(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',bgcolor: 'background.paper',boxShadow: 24,p: 3,}} 
        className="rounded-[10px] lg:w-[800px] w-[90%] lg:h-fit h-[70%] overflow-y-auto"
        >
        <div className="flex justify-between items-center w-full mb-3">
        <h3 className="font-bold text-[1.5rem] text-gray-800 dark:text-white">
            Edit {title}
        </h3>
        <button type="button" className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-focus-management-modal" onClick={()=>setOpenModalEdit(false)}>
            <span className="sr-only">Close</span>
            <svg className="flex-shrink-0 size-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        </div>
        <hr/>
        <div className="flex mt-5 flex-col gap-y-5">
        {
        title === 'User' ?
        <div className="mt-5 lg:grid grid-cols-2 gap-y-6 gap-x-8 flex flex-col">
        <Input 
        label='Full Name' 
        placeholder='Enter full name to get started'
        onChange={()=> setFullName(event.target.value)}
        value={fullname}
        />
        <Input 
        label='Email' 
        placeholder='Enter email to get started'
        onChange={()=> setEmail(event.target.value)}
        value={email}
        />
        <Input 
        label='Password' 
        placeholder='Enter password to get started'
        onChange={()=> setPassword(event.target.value)}
        value={password}
        />
        <Input 
        label='Phone Number' 
        placeholder='Enter phone number to get started'
        onChange={()=> setPhoneNumber(event.target.value)}
        value={phoneNumber}
        />
        <Input 
        label='Address' 
        placeholder='Enter address to get started'
        onChange={()=> setAddress(event.target.value)}
        value={address}
        />

        <div className="flex flex-col ">
        <label  className="text-base font-medium text-gray-900">Role</label>
        <FormControl className='mt-3'>
        <Select
        value={role}
        displayEmpty
        onChange={(event) => setRole(event.target.value)}
        inputProps={{ 'aria-label': 'Without label' }}
        >
        
        <MenuItem value='customer'>Customer</MenuItem>
        <MenuItem  value='admin'>Admin</MenuItem>

        </Select>
    </FormControl>
    </div>
    </div>
    : title === 'Product' ?
    <div className="lg:grid grid-cols-2 gap-y-6 gap-x-8 flex flex-col">
    <Input 
    label='Product Name' 
    placeholder='Enter product name to get started'
    onChange={()=> setProductName(event.target.value)}
    value={productName}
    />
    <Input 
    label='Colors' 
    placeholder='Enter colors to get started'
    onChange={(event) => setColors(event.target.value.split(','))}
    value={colors.join(',')}
    />
    <Input 
    label='Colors Code' 
    placeholder='Enter colors code to get started'
    onChange={()=> setColorsCode(event.target.value.split(','))}
    value={colorsCode.join(',')}
    />
    <Input 
    label='Price' 
    placeholder='Enter price to get started'
    onChange={(event) => setPrice(event.target.value)}
    value={price.toLocaleString()}
    />
    <Input 
    label='Image' 
    placeholder='Enter image to get started'
    onChange={()=> setImages(event.target.value)}
    value={images}
    />
    <Input 
    label='Size' 
    placeholder='Enter size to get started'
    onChange={()=> setSize(event.target.value.split(','))}
    value={size.join(',')}
    />
    <Input 
    label='Description' 
    placeholder='Enter description to get started'
    onChange={()=> setDescription(event.target.value)}
    value={description}
    />

    <div className="flex flex-col ">
    <label  className="text-base font-medium text-gray-900">CategoryId</label>
    <FormControl className='mt-3'>
    <Select
    value={categoryId}
    displayEmpty
    onChange={(event) => setCategoryId(event.target.value)}
    inputProps={{ 'aria-label': 'Without label' }}
    >
    {
        categoriesData.map(category => (
            <MenuItem value={category.id}>{category.id}</MenuItem>
        ))
    }
    </Select>
    </FormControl>
    </div>
    </div>
    :null
    }
        <div className="flex justify-end items-center gap-x-2 ">
        <button onClick={()=>setOpenModalEdit(false)} type="button" className="py-3 px-5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-focus-management-modal">
            Close
        </button>
        <button onClick={update} type="button" className="py-3 px-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-600 text-white hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            Save changes
        </button>
        </div>
        </div>
        </Box>
    </Modal>
    </>
  )
}
