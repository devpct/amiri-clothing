import React, { useState } from 'react';
import { Avatar, Box, IconButton, Modal } from '@mui/material';
import { startCase } from 'lodash';
import axios from 'axios';
import { mutate } from 'swr';
import Input from '@/components/modules/Input'

export default function Users({ usersData }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdmins, setShowAdmins] = useState(false);
  const [showCustomers, setShowCustomers] = useState(false);
  const [open, setOpen] = useState(false);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const toggleUserSelection = (userId, isAdmin) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const toggleSelectAllUsers = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      const allUserIds = filteredUsers.map(user => user.id);
      setSelectedUsers(allUserIds);
    }
  };

  const filteredUsers = usersData?.filter(user => {
    const isSingleWord = searchTerm.trim().indexOf(' ') === -1;
    const searchEmail = searchTerm.trim().toLowerCase();
    if (isSingleWord) {
      if (searchEmail.endsWith('.com')) {
        return user.email.toLowerCase().includes(searchEmail);
      } else {
        return user.fullname.toLowerCase().includes(searchEmail) || user.phonenumber.includes(searchTerm);
      }
    } else {
      return user.fullname.toLowerCase().includes(searchEmail) || user.phonenumber.includes(searchTerm);
    }
  }).filter(user => {
    if ((showAdmins && user.role === 'admin') || (showCustomers && user.role === 'customer')) {
      return true;
    }
    if (!showAdmins && !showCustomers) {
      return true;
    }
    return false;
  });
  

  const getSelectedCount = () => {
    return selectedUsers.length;
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setFullName('');
    setEmail('');
    setPassword('');
    setPhoneNumber('');
    setAddress('');
    setRole('');
  };

  const deleteUsers = async () => {
    let nonAdminUsersToDelete;
  
    if (!showAdmins && !showCustomers) {
      nonAdminUsersToDelete = selectedUsers;
    } else {
      nonAdminUsersToDelete = selectedUsers.filter(userId => {
        const user = usersData.find(u => u.id === userId);
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
    setSelectedUsers([]);
  };
  
  
  
  
  
  
  const addUsers = async () => {

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
    setRole('')
    setOpen(false)
  }

  const [clickedCheckbox, setClickedCheckbox] = useState(null);


const handleShowAdminsChange = (newValue) => {
  if (clickedCheckbox === "admins") {
    setShowAdmins(false);
    setClickedCheckbox(null);
  } else {
    setShowAdmins(true);
    setShowCustomers(false);
    setClickedCheckbox("admins");
  }

    setSelectedUsers([]);

  setShowAdmins(newValue);
};

const handleShowCustomersChange = (newValue) => {
  if (clickedCheckbox === "customers") {
    setShowCustomers(false);
    setClickedCheckbox(null);
  } else {
    setShowCustomers(true);
    setShowAdmins(false);
    setClickedCheckbox("customers");
  }

    setSelectedUsers([]);

  setShowCustomers(newValue);
};

  return (
    <>
      <section className="container mx-auto ">
        <div className="flex items-center justify-between">
          <div className='flex items-center gap-x-3'>
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Users</h2>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{usersData?.length} users</span>
          </div>

          <div className="relative lg:w-[35rem]">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-400 cursor-pointer" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-x-8">

          <div className="flex gap-x-2">
            <input
              type="checkbox"
              className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
              checked={showAdmins}
              onChange={(e) => handleShowAdminsChange(e.target.checked)}
            />
            <span>Admin</span>
          </div>

          <div className="flex gap-x-2">
            <input
              type="checkbox"
              className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
              checked={showCustomers}
              onChange={(e) => handleShowCustomersChange(e.target.checked)}
            />
            <span>Customer</span>
          </div>

          <div>
          <p className="text-blue-500">
            Selected {getSelectedCount()}
          </p>
          </div>
          </div>

          <div className="flex items-center gap-x-6">
          <button 
            className="flex items-center gap-x-2 text-gray-500 transition-colors duration-200 dark:text-gray-300  focus:outline-none border rounded-[10px] p-2 pr-4"
            onClick={() => deleteUsers(selectedUsers)}
          >
            <svg width="25" height="25" fill="none" stroke="#ff0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6h18"></path>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <path d="M10 11v6"></path>
              <path d="M14 11v6"></path>
            </svg>
            <p className='text-red-500'>Delete</p>
          </button>
            <button className="flex items-center gap-x-2 text-gray-500 transition-colors duration-200 dark:text-gray-300  focus:outline-none border rounded-[10px] p-2 pr-4">
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
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 500,height: 'height-fit',bgcolor: 'background.paper',boxShadow: 24,p: 3,}} 
              className="rounded-[10px]"
              >
              <div className="flex justify-between items-center w-full mb-3">
                <h3 className="font-bold text-[1.5rem] text-gray-800 dark:text-white">
                  Add User
                </h3>
                <button type="button" className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-focus-management-modal" onClick={handleClose}>
                  <span className="sr-only">Close</span>
                  <svg className="flex-shrink-0 size-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
              <hr/>
              <div className="flex mt-5 flex-col gap-y-5">
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
              <Input 
              label='Role' 
              placeholder='Enter role to get started'
              onChange={()=> setRole(event.target.value)}
              value={role}
              />
              <div className="flex justify-end items-center gap-x-2 ">
                <button onClick={handleClose} type="button" className="py-3 px-5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-focus-management-modal">
                  Close
                </button>
                <button onClick={addUsers} type="button" className="py-3 px-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-600 text-white hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  Save changes
                </button>
              </div>
              </div>
              </Box>
            </Modal>
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className=" overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="relative min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className=" bg-gray-50 dark:bg-gray-800">
                  <tr>
                      <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-x-3">
                          <input
                            type="checkbox"
                            className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                            checked={selectedUsers.length}
                            onChange={toggleSelectAllUsers}
                          />
                          <span>Name</span>
                        </div>
                      </th>
                      <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <button className="flex items-center gap-x-2">
                          <span>Status</span>
                        </button>
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <button className="flex items-center gap-x-2">
                          <span>Phone Number</span>
                        </button>
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Email address</th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Address</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {filteredUsers?.length > 0 ? (
                      filteredUsers.map(admin => (
                        <tr
                          key={admin.id}
                          className={`${
                            selectedUsers.includes(admin.id)
                              ? 'bg-blue-100 dark:bg-emerald-100'
                              : ''
                            }`}
                          onClick={() => toggleUserSelection(admin.id)}
                        >
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <input type="checkbox" className=" border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                                checked={selectedUsers.includes(admin.id)}
                                onChange={() => toggleUserSelection(admin.id)}
                              />
                              <div className="flex items-center gap-x-2">
                                <IconButton>
                                  <Avatar alt={admin.fullname} src="/static/images/avatar/2.jpg" />
                                </IconButton>
                                <div>
                                  <h2 className="font-medium text-gray-800 dark:text-white ">{admin.fullname}</h2>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            {admin.role !== 'admin' ?
                              <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-gray-100/60 dark:bg-gray-800">
                                <span className="h-1.5 w-1.5 rounded-full bg-gray-500"></span>
                                <h2 className="text-sm font-normal text-gray-500">{startCase(admin.role)}</h2>
                              </div>
                              :
                              <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                <h2 className="text-sm font-normal text-emerald-500">{startCase(admin.role)}</h2>
                              </div>
                            }
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{admin.phonenumber.length > 0 ? admin.phonenumber : 'Null'}</td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{admin.email}</td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{admin.address.length > 0 ? admin.address : 'Null'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap text-center">No matching users found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            <span>previous</span>
          </a>
          <div className="items-center hidden lg:flex gap-x-3">
            <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
          </div>
          <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <span>Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
