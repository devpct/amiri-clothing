import React from 'react'
import {Box, FormControl, MenuItem, Modal, Select } from '@mui/material';
import Input from '@/components/modules/Input'
import axios from 'axios';
import { mutate } from 'swr';
import moment from 'moment';
import localhostBackend from '@/localhost';

export default function UsersModal({
    openModalAdd,
    openModalEdit,
    setOpenModalEdit,
    setOpenModalAdd,
    setFullName,
    setEmail,
    setAddress,
    setPassword,
    setPhoneNumber,
    setRole,
    fullname,
    phoneNumber,
    email,
    password,
    address,
    role,
    title,
    categoriesData,
    setProductName,
    setColors,
    setColorsCode,
    setPrice,
    setImages,
    setDescription,
    setSize,
    setCategoryId,
    productName,
    colors,
    colorsCode,
    price,
    images,
    description,
    size,
    categoryId,
    selected,
    categoryName,
    setCategoryName,
    setText,
    setCustomerId,
    setProductId,
    setLike,
    text,
    customerId,
    productId,
    like,
    image,
    setImage,
    colorName,
    qty,
    setColorName,
    setQty,
    status,
    setStatus
    }:
    {
    openModalAdd:any,
    openModalEdit:any,
    setOpenModalEdit:any,
    setOpenModalAdd:any,
    setFullName:any,
    setEmail:any,
    setAddress:any,
    setPassword:any,
    setPhoneNumber:any,
    setRole:any,
    fullname:any,
    phoneNumber:any,
    email:any,
    password:any,
    address:any,
    role:any,
    title:any,
    categoriesData:any,
    setProductName:any,
    setColors:any,
    setColorsCode:any,
    setPrice:any,
    setImages:any,
    setDescription:any,
    setSize:any,
    setCategoryId:any,
    productName:any,
    colors:any,
    colorsCode:any,
    price:any,
    images:any,
    description:any,
    size:any,
    categoryId:any,
    selected:any,
    categoryName:any,
    setCategoryName:any,
    setText:any,
    setCustomerId:any,
    setProductId:any,
    setLike:any,
    text:any,
    customerId:any,
    productId:any,
    like:any,
    image:any,
    setImage:any,
    colorName:any,
    qty:any,
    setColorName:any,
    setQty:any,
    status:any,
    setStatus:any
    }) {
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
        setImages([])
        setDescription('')
        setSize([])
        setCategoryId(1)
      }else if (title === 'Categories'){
        setCategoryName('');
        setCategoryId('')
      }else if (title === 'Comments'){
        setText('')
        setCustomerId('')
        setProductId(1)
        setLike(0)            
      }else if (title === 'Sliders'){
        setImage('')
      }else if (title === 'Cart'){
        setCustomerId('')
        setProductId(1)
        setSize('')
        setColorName('')
        setQty(1)
      }else if (title === 'Orders'){
        setCustomerId('')
        setProductId(1)
        setSize('')
        setColorName('')
        setQty(1)
        setStatus('preparing')
      }
        setOpenModalAdd(false);
        setOpenModalEdit(false);
      };
      const add = async () => {
        setOpenModalAdd(false)
        if(title === 'User'){
        await axios.post(`${localhostBackend}/users`, {
          fullname,
          email,
          password,
          phonenumber : phoneNumber,
          address,
          role,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        });
    
        mutate('Users')
    
        setFullName('')
        setEmail('')
        setPassword('')
        setPhoneNumber('')
        setAddress('')
        }else if (title === 'Product'){
            await axios.post(`${localhostBackend}/products`, {
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
              setImages([])
              setDescription('')
              setSize([])
              setCategoryId(1)
          }else if (title === 'Categories'){
            if(categoryId){
              await axios.post(`${localhostBackend}/categories`, {
                id: categoryId,
                name: categoryName,
              });
              
              mutate('Categories')
              
              setCategoryName('');
              setCategoryId('')
            }else{
              setOpenModalAdd(true)
            }
          }else if (title === 'Comments'){
            await axios.post(`${localhostBackend}/comments`, {
              text: text,
              customer_id: customerId,
              product_id: productId,
              like: like,
            });
            
            mutate('Comments')
            
            setText('')
            setCustomerId('')
            setProductId(1)
            setLike(0)  
          }else if (title === 'Sliders'){
            await axios.post(`${localhostBackend}/slider`, {
              image: image,
            });
            
            mutate('Sliders')
            
            setImage('')
          }else if (title === 'Cart'){
            await axios.post(`${localhostBackend}/cart`, {
              customer_id: customerId,
              product_id: productId,
              color_name: colorName,
              size,
              qty
            });
            
            mutate('Cart')
            
            setCustomerId('')
            setProductId(1)
            setSize('')
            setColorName('')
            setQty(1)
          }else if (title === 'Orders'){
            await axios.post(`${localhostBackend}/order`, {
              customer_id: customerId,
              product_id: productId,
              color_name: colorName,
              size,
              qty,
              status
            });
            
            mutate('Orders')
            
            setCustomerId('')
            setProductId(1)
            setSize('')
            setColorName('')
            setQty(1)
            setStatus('preparing')
          }
        }
      const update = async () => {
        setOpenModalEdit(false);
        if(title === 'User'){
        await axios.put(`${localhostBackend}/users/${selected[0]}`, {
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
            await axios.put(`${localhostBackend}/products/${selected[0]}`, {
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
              setImages([])
              setDescription('')
              setSize([])
              setCategoryId(1)
        }else if (title === 'Categories'){
          if(categoryId){
              await axios.put(`${localhostBackend}/categories/${selected[0]}`, {
                  id: categoryId,
                  name: categoryName,
                });
            
                mutate('Categories')
            
              setCategoryName('');
              setCategoryId('')
          }else{
            setOpenModalEdit(true);
          }
        }else if (title === 'Comments'){
          await axios.put(`${localhostBackend}/comments/${selected[0]}`, {
            text: text,
            customer_id: customerId,
            product_id: productId,
            like: like,
          });
          
          mutate('Comments')
          
          setText('')
          setCustomerId('')
          setProductId(1)
          setLike(0)  
        }else if (title === 'Sliders'){
          await axios.put(`${localhostBackend}/slider/${selected[0]}`, {
            image: image,
          });
          
          mutate('Sliders')
          
          setImage('')
        }else if (title === 'Cart'){
          await axios.put(`${localhostBackend}/cart/${selected[0]}`, {
            customer_id: customerId,
            product_id: productId,
            color_name: colorName,
            size,
            qty
          });
          
          mutate('Cart')
          
          setCustomerId('')
          setProductId(1)
          setSize('')
          setColorName('')
          setQty(1)
        }else if (title === 'Orders'){
          await axios.put(`${localhostBackend}/order/${selected[0]}`, {
            customer_id: customerId,
            product_id: productId,
            color_name: colorName,
            size,
            qty,
            status
          });
          
          mutate('Orders')
          
          setCustomerId('')
          setProductId(1)
          setSize('')
          setColorName('')
          setQty(1)
          setStatus('preparing')
        }
      };

  return (
    <>
    <Modal
        open={openModalAdd || openModalEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 3,
          }}
          className={`rounded-[10px] lg:w-[800px] lg:h-fit w-[90%] ${title === 'Categories' ? 'h-fit' : title === 'Sliders' ? 'h-fit' : ''} h-[70%] overflow-y-auto`}
        >
          <div className="flex justify-between items-center w-full mb-3">
            <h3 className="font-bold text-[1.5rem] text-gray-800 dark:text-white">
              {openModalAdd ? `Add ${title}` : `Edit ${title}`}
            </h3>
            <button
              type="button"
              className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-hs-overlay="#hs-focus-management-modal"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <svg
                className="flex-shrink-0 size-7"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <hr />
          <div className="flex mt-5 flex-col gap-y-5">
            {title === 'User' ? (
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
                        onChange={(event)=> setEmail(event.target.value)}
                        value={email}
                        />
                        <Input 
                        label='Password' 
                        placeholder='Enter password to get started'
                        onChange={(event)=> setPassword(event.target.value)}
                        value={password}
                        />
                        <Input 
                        label='Phone Number' 
                        placeholder='Enter phone number to get started'
                        onChange={(event)=> setPhoneNumber(event.target.value)}
                        value={phoneNumber}
                        />
                        <Input 
                        label='Address' 
                        placeholder='Enter address to get started'
                        onChange={(event)=> setAddress(event.target.value)}
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
            ) : title === 'Product' ? (
              <div className="lg:grid grid-cols-2 gap-y-6 gap-x-8 flex flex-col">
                    <Input 
                    label='Product Name' 
                    placeholder='Enter product name to get started'
                    onChange={(event)=> setProductName(event.target.value)}
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
                    onChange={()=> setImages(event.target.value.split(','))}
                    value={images.join(',')}
                    />
                    <Input 
                    label='Size' 
                    placeholder='Enter size to get started'
                    onChange={(event)=> setSize(event.target.value.split(','))}
                    value={size.join(',')}
                    />
                    <Input 
                    label='Description' 
                    placeholder='Enter description to get started'
                    onChange={(event)=> setDescription(event.target.value)}
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
            ) : title === 'Categories' ? (
              <div className="lg:grid grid-cols-2 gap-y-6 gap-x-8 flex flex-col">
                    <Input 
                    label='Category Id' 
                    placeholder='Enter category id to get started'
                    onChange={(event)=> setCategoryId(event.target.value)}
                    value={categoryId}
                    />
                    <Input 
                    label='Category Name' 
                    placeholder='Enter category name to get started'
                    onChange={(event) => setCategoryName(event.target.value)}
                    value={categoryName}
                    />
              </div>
            ) : title === 'Comments' ? (
              <div className="lg:grid grid-cols-2 gap-y-6 gap-x-8 flex flex-col">
                    <Input 
                    label='Customer Id' 
                    placeholder='Enter customer Id to get started'
                    onChange={(event)=> setCustomerId(event.target.value)}
                    value={customerId}
                    />
                    <Input 
                    label='Product Id' 
                    placeholder='Enter product id to get started'
                    onChange={(event) => setProductId(event.target.value)}
                    value={productId}
                    />
                    <Input 
                    label='Text' 
                    placeholder='Enter text to get started'
                    onChange={(event) => setText(event.target.value)}
                    value={text}
                    />
                    <Input 
                    label='Like' 
                    placeholder='Enter like to get started'
                    onChange={(event) => setLike(event.target.value)}
                    value={like}
                    />
              </div>
            ) : title === 'Sliders' ? (
              <div>
                    <Input 
                    label='Image' 
                    placeholder='Enter image to get started'
                    onChange={(event)=> setImage(event.target.value)}
                    value={image}
                    />
              </div>
            ) : title === 'Cart' ? (
              <div className="lg:grid grid-cols-2 gap-y-6 gap-x-8 flex flex-col">
                    <Input 
                    label='Customer Id' 
                    placeholder='Enter customer Id to get started'
                    onChange={(event)=> setCustomerId(event.target.value)}
                    value={customerId}
                    />
                    <Input 
                    label='Product Id' 
                    placeholder='Enter product id to get started'
                    onChange={(event) => setProductId(event.target.value)}
                    value={productId}
                    />
                    <Input 
                    label='Color Name' 
                    placeholder='Enter color name to get started'
                    onChange={(event) => setColorName(event.target.value)}
                    value={colorName}
                    />
                    <Input 
                    label='Size' 
                    placeholder='Enter size to get started'
                    onChange={(event) => setSize(event.target.value)}
                    value={size}
                    />
                    <Input 
                    label='Qty' 
                    placeholder='Enter qty to get started'
                    onChange={(event) => setQty(event.target.value)}
                    value={qty}
                    />
              </div>
            ) : title === 'Orders' ? (
              <div className="lg:grid grid-cols-2 gap-y-6 gap-x-8 flex flex-col">
                    <Input 
                    label='Customer Id' 
                    placeholder='Enter customer Id to get started'
                    onChange={(event)=> setCustomerId(event.target.value)}
                    value={customerId}
                    />
                    <Input 
                    label='Product Id' 
                    placeholder='Enter product id to get started'
                    onChange={(event) => setProductId(event.target.value)}
                    value={productId}
                    />
                    <Input 
                    label='Color Name' 
                    placeholder='Enter color name to get started'
                    onChange={(event) => setColorName(event.target.value)}
                    value={colorName}
                    />
                    <Input 
                    label='Size' 
                    placeholder='Enter size to get started'
                    onChange={(event) => setSize(event.target.value)}
                    value={size}
                    />
                    <Input 
                    label='Qty' 
                    placeholder='Enter qty to get started'
                    onChange={(event) => setQty(event.target.value)}
                    value={qty}
                    />
                  <div className="flex flex-col ">
                    <label  className="text-base font-medium text-gray-900">Status</label>
                  <FormControl className='mt-3'>
                        <Select
                        value={status}
                        displayEmpty
                        onChange={(event) => setStatus(event.target.value)}
                        inputProps={{ 'aria-label': 'Without label' }}
                        >
                        
                        <MenuItem value='preparing'>Preparing</MenuItem>
                        <MenuItem  value='sending'>Sending</MenuItem>
                        <MenuItem  value='delivery'>Delivery</MenuItem>

                        </Select>
                    </FormControl>
              </div>
              </div>
            ) : null
            }
            <div className="flex justify-end items-center gap-x-2 ">
              <button
                onClick={handleClose}
                type="button"
                className="py-3 px-5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-focus-management-modal"
              >
                Close
              </button>
              <button
                onClick={openModalAdd ? add : update}
                type="button"
                className="py-3 px-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-600 text-white hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                Save changes
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}
