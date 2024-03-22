import React, { useState } from 'react';
import Search from '@/components/modules/Dashboard/Admin/Search';
import ChekboxFilter from '@/components/modules/Dashboard/Admin/Users/ChekboxFilter';
import Buttons from '@/components/modules/Dashboard/Admin/Buttons';
import Modal from '@/components/modules/Dashboard/Admin/Modal';
import Pagination from '@/components/modules/Dashboard/Admin/Pagination';
import Table from '@/components/modules/Dashboard/Admin/Table';

export default function Users({ usersData }:{ usersData:any }) {
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdmins, setShowAdmins] = useState(false);
  const [showCustomers, setShowCustomers] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('customer');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

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
    return selected.length;
  };

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const current = filteredUsers?.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <section className="sm:container w-[90%] mx-auto sm:px-10 ">
        <div className="flex flex-wrap justify-center gap-7 items-center lg:justify-around">
          <div className='flex items-center gap-x-3'>
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Users</h2>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{`${filteredUsers?.length} ${showAdmins ? 'Admin': showCustomers ? 'Customer': 'User'}`}</span>
          </div>

          <Search value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

         <ChekboxFilter showAdmins={showAdmins} showCustomers={showCustomers} selected={selected} setShowAdmins={setShowAdmins} setShowCustomers={setShowCustomers} setSelected={setSelected}/>

        <Buttons selected={selected} filteredUsers={filteredUsers}  setOpenModalAdd={setOpenModalAdd} setOpenModalEdit={setOpenModalEdit} setSelected={setSelected} data={usersData} setAddress={setAddress} setEmail={setEmail} setFullName={setFullName} setPassword={setPassword} setPhoneNumber={setPhoneNumber} setRole={setRole} showAdmins={showAdmins} showCustomers={showCustomers} title={'users'}/>
        </div>

        <Modal address={address} email={email} fullname={fullname} openModalAdd={openModalAdd} openModalEdit={openModalEdit} password={password} phoneNumber={phoneNumber} role={role} setAddress={setAddress} setEmail={setEmail} setFullName={setFullName} setOpenModalAdd={setOpenModalAdd} setOpenModalEdit={setOpenModalEdit} setPassword={setPassword} setPhoneNumber={setPhoneNumber} setRole={setRole} selected={selected} title={'User'}/>

        <Table data={current} selected={selected} setSelected={setSelected} 
        columnNames={['Id','Name','Status','Phone Number','Email address','Address']} title={'users'}/>

            <p className="text-blue-500 w-full mt-2  text-right">
            Selected {getSelectedCount()}
            </p>

        <Pagination
          total={filteredUsers?.length}
          perPage={perPage}
          paginate={paginate}
        />

      </section>
    </>
  );
}
