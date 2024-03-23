import axios from 'axios';
import React from 'react'
import { mutate } from 'swr';
import localhostBackend from '@/localhost';

export default function Buttons({ 
    selected, 
    setOpenModalAdd, 
    setFullName, 
    setEmail, 
    setPassword, 
    setPhoneNumber, 
    setAddress, 
    setRole, 
    showAdmins, 
    showCustomers,
    data, 
    setSelected, 
    filteredUsers, 
    setOpenModalEdit, 
    title, 
    setProductName, 
    setColors, 
    setColorsCode, 
    setPrice, 
    setImages, 
    setDescription, 
    setSize, 
    setCategoryId,
    setCategoryName,
    setText,
    setCustomerId,
    setProductId,
    setLike,
    setImage,
    setColorName,
    setQty,
    setStatus
    }:
    { 
    selected:any, 
    setOpenModalAdd:any, 
    setFullName:any, 
    setEmail:any, 
    setPassword:any, 
    setPhoneNumber:any, 
    setAddress:any, 
    setRole:any, 
    showAdmins:any, 
    showCustomers:any,
    data:any, 
    setSelected:any, 
    filteredUsers:any, 
    setOpenModalEdit:any, 
    title:any, 
    setProductName:any, 
    setColors:any, 
    setColorsCode:any, 
    setPrice:any, 
    setImages:any, 
    setDescription:any, 
    setSize:any, 
    setCategoryId:any,
    setCategoryName:any,
    setText:any,
    setCustomerId:any,
    setProductId:any,
    setLike:any,
    setImage:any,
    setColorName:any,
    setQty:any,
    setStatus:any
    }) {
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
            setImages([])
            setDescription('')
            setSize([])
            setCategoryId(1)
        }else if (title === 'categories'){
            setCategoryName('')
            setCategoryId('')
        }else if (title === 'comments'){
            setText('')
            setCustomerId('')
            setProductId(1)
            setLike(0)            
        }else if (title === 'sliders'){
            setImage('')
        }else if (title === 'cart'){
            setCustomerId('')
            setProductId(1)
            setSize('')
            setColorName('')
            setQty(1)
        }else if (title === 'orders'){
            setCustomerId('')
            setProductId(1)
            setSize('')
            setColorName('')
            setQty(1)
            setStatus('preparing')
        }
        setOpenModalAdd(true);
    }

    const deleted = async () => {
    if(title === 'users'){
    let nonAdminUsersToDelete;
    
    if (!showAdmins && !showCustomers) {
        nonAdminUsersToDelete = selected;
    } else {
        nonAdminUsersToDelete = selected.filter((userId:{userId:any}) => {
        const user = data.find((u:{u:any}) => u.id === userId);
        if (!showAdmins) {
            return user && user.role === 'customer';
        }
        if (!showCustomers) {
            return user && user.role === 'admin';
        }
        return user && user.role !== 'admin';
        });
    }
    
    await Promise.all(nonAdminUsersToDelete.map(async (userId:{userId:any}) => {
        await axios.delete(`${localhostBackend}/users/${userId}`);
    }));
    
    mutate('Users');
    }else if (title === 'products') {
        await Promise.all(selected.map(async (productId:{productId:any}) => {
            await axios.delete(`${localhostBackend}/products/${productId}`);
        }));
        mutate('Products');
    }else if (title === 'categories') {
        await Promise.all(selected.map(async (categoryId:{categoryId:any}) => {
            await axios.delete(`${localhostBackend}/categories/${categoryId}`);
        }));
        mutate('Categories');
    }else if (title === 'comments'){
        await Promise.all(selected.map(async (commentId:{commentId:any}) => {
            await axios.delete(`${localhostBackend}/comments/${commentId}`);
        }));
        mutate('Comments');
    }else if (title === 'sliders'){
        await Promise.all(selected.map(async (sliderId:{sliderId:any}) => {
            await axios.delete(`${localhostBackend}/slider/${sliderId}`);
        }));
        mutate('Sliders');
    }else if (title === 'cart'){
        await Promise.all(selected.map(async (cartId:{cartId:any}) => {
            await axios.delete(`${localhostBackend}/cart/${cartId}`);
        }));
        mutate('Cart');
    }else if (title === 'orders'){
        await Promise.all(selected.map(async (orderId:{orderId:any}) => {
            await axios.delete(`${localhostBackend}/order/${orderId}`);
        }));
        mutate('Orders');
    }
        setSelected([]);
    };

    const handleOpenEdit = () => {
    if (selected.length === 1) {
        setOpenModalEdit(true);
        if(title === 'users'){
        const selectedUserId = selected[0];
        const selectedUser = filteredUsers.find((user:{user:any}) => user.id === selectedUserId);
        if (selectedUser) {
        setFullName(selectedUser.fullname || '');
        setEmail(selectedUser.email || '');
        setPhoneNumber(selectedUser.phonenumber || '');
        setAddress(selectedUser.address || '');
        setRole(selectedUser.role || 'customer');
    }
    }else if (title === 'products'){
        const selectedProductId = selected[0];
        const selectedProduct = data.find((product:{product:any}) => product.id === selectedProductId);
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
    }else if (title === 'categories'){
        const selectedCategoryId = selected[0];
        const selectedCategory = data.find((category:{category:any}) => category.id === selectedCategoryId);
        if (selectedCategory) {
        setCategoryName(selectedCategory.name || '');
        setCategoryId(selectedCategory.id || '')
        }
    }else if (title === 'comments'){
        const selectedCommentId = selected[0];
        const selectedComment = data.find((comment:{comment:any}) => comment.id === selectedCommentId);
        if (selectedComment) {
        setText(selectedComment.text || '')
        setCustomerId(selectedComment.customer_id || '')
        setProductId(selectedComment.product_id || 1)
        setLike(selectedComment.like || 0)    
        }
    }else if (title === 'sliders'){
        const selectedSliderId = selected[0];
        const selectedSlider = data.find((slider:{slider:any}) => slider.id === selectedSliderId);
        if (selectedSlider) {
            setImage(selectedSlider.image || '');  
        }
    }else if (title === 'cart'){
        const selectedCartId = selected[0];
        const selectedCart = data.find((cart:{cart:any}) => cart.id === selectedCartId);
        if (selectedCart) {
        setCustomerId(selectedCart.customer_id || '')
        setProductId(selectedCart.product_id || 1)
        setSize(selectedCart.size || '')
        setColorName(selectedCart.color_name || '')    
        setQty(selectedCart.qty || 1)    
    }
    }else if (title === 'orders'){
        const selectedOrderId = selected[0];
        const selectedOrder = data.find((order:{order:any}) => order.id === selectedOrderId);
        if (selectedOrder) {
        setCustomerId(selectedOrder.customer_id || '')
        setProductId(selectedOrder.product_id || 1)
        setSize(selectedOrder.size || '')
        setColorName(selectedOrder.color_name || '')    
        setQty(selectedOrder.qty || 1)  
        setStatus(selectedOrder.status || 'preparing')    
    }}
    }
    }

  return (
    <>
    <div className="flex items-center gap-x-6">
        <button 
        className="bg-white flex items-center gap-x-2 text-gray-500 transition-colors duration-200 dark:text-gray-300  focus:outline-none border rounded-[10px] p-2 pr-4"
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

        <button onClick={handleOpenEdit} className="flex items-center gap-x-2 text-gray-500 transition-colors duration-200 bg-white  focus:outline-none border rounded-[10px] p-2 pr-4">
        <svg width="25" height="25" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
        <p>Edit</p>
        </button>

        <button onClick={handleOpen} className="flex items-center gap-x-2 text-gray-500 transition-colors duration-200 bg-white  focus:outline-none border rounded-[10px] p-2 pr-4">
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
