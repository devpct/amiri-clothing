import axios from 'axios';
import React from 'react'
import { mutate } from 'swr';

export default function Buttons({ selected, setOpenModalAdd, setFullName, setEmail, setPassword, setPhoneNumber, setAddress, setRole, showAdmins, showCustomers, data, setSelected, filteredUsers, setOpenModalEdit, title, setProductName, setColors, setColorsCode, setPrice, setImages, setDescription, setSize, setCategoryId}) {
    const handleOpen = () => {
        if(title === 'users'){
            setFullName('');
            setEmail('');
            setPassword('');
            setPhoneNumber('');
            setAddress('');
            setRole('customer')
        }else if (title === 'products'){
            setProductName('');
            setColors([]);
            setColorsCode([]);
            setPrice('');
            setImages('')
            setDescription('')
            setSize([])
            setCategoryId(1)
        }
        setOpenModalAdd(true);
    }

    const deleted = async () => {
    if(title === 'users'){
    let nonAdminUsersToDelete;
    
    if (!showAdmins && !showCustomers) {
        nonAdminUsersToDelete = selected;
    } else {
        nonAdminUsersToDelete = selected.filter(userId => {
        const user = data.find(u => u.id === userId);
        if (!showAdmins) {
            return user && user.role === 'customer';
        }
        if (!showCustomers) {
            return user && user.role === 'admin';
        }
        return user && user.role !== 'admin';
        });
    }
    
    await Promise.all(nonAdminUsersToDelete.map(async (userId) => {
        await axios.delete(`http://localhost:4000/users/${userId}`);
    }));
    
    mutate('Users');
    }else if (title === 'products') {
        await Promise.all(selected.map(async (productId) => {
            await axios.delete(`http://localhost:4000/products/${productId}`);
        }));
        mutate('Products');
    }
    setSelected([]);
    };

    const handleOpenEdit = () => {
    if (selected.length === 1) {
        if(title === 'users'){
        const selectedUserId = selected[0];
        const selectedUser = filteredUsers.find(user => user.id === selectedUserId);
        if (selectedUser) {
        setFullName(selectedUser.fullname || '');
        setEmail(selectedUser.email || '');
        setPhoneNumber(selectedUser.phonenumber || '');
        setAddress(selectedUser.address || '');
        setRole(selectedUser.role || 'customer');
    }
    }else if (title === 'products'){
        const selectedProductId = selected[0];
        const selectedProduct = data.find(product => product.id === selectedProductId);
        if (selectedProduct) {
        setProductName(selectedProduct.name || '');
        setColors(selectedProduct.colors || []);
        setColorsCode(selectedProduct.colors_code || []);
        setPrice(selectedProduct.price || '');
        setImages(selectedProduct.images || '')
        setDescription(selectedProduct.description || '')
        setSize(selectedProduct.size || [])
        setCategoryId(selectedProduct.category_id || 1)
        }
    }
    setOpenModalEdit(true);
    }
    };

  return (
    <>
    <div className="flex items-center gap-x-6">
        <button 
        className="flex items-center gap-x-2 text-gray-500 transition-colors duration-200 dark:text-gray-300  focus:outline-none border rounded-[10px] p-2 pr-4"
        onClick={deleted}
        >
        <svg width="25" height="25" fill="none" stroke="#ff0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6h18"></path>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <path d="M10 11v6"></path>
            <path d="M14 11v6"></path>
        </svg>
        <p className='text-red-500'>Delete</p>
        </button>

        <button onClick={handleOpenEdit} className="flex items-center gap-x-2 text-gray-500 transition-colors duration-200 dark:text-gray-300  focus:outline-none border rounded-[10px] p-2 pr-4">
        <svg width="25" height="25" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
        <p>Edit</p>
        </button>

        <button onClick={handleOpen} className="flex items-center gap-x-2 text-gray-500 transition-colors duration-200 dark:text-gray-300  focus:outline-none border rounded-[10px] p-2 pr-4">
        <svg width="25" height="25" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14"></path>
            <path d="M5 12h14"></path>
        </svg>
        <p>Add</p>
        </button>
    </div>
    </>
  )
}
