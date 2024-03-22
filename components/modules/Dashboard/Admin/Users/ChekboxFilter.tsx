import React, { useState } from 'react'

export default function ChekboxFilter({ showAdmins, showCustomers, selectedUsers, setShowAdmins, setShowCustomers, setSelectedUsers  }:{ showAdmins:any, showCustomers:any, selectedUsers:any, setShowAdmins:any, setShowCustomers:any, setSelectedUsers:any  }) {

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
    <div className="flex items-center gap-x-8">
        <div className="flex gap-x-2">
            <input
                type="checkbox"
                className="text-blue-500 border-gray-300 rounded  dark:ring-offset-gray-900 dark:border-gray-700"
                checked={showAdmins}
                onChange={(e) => handleShowAdminsChange(e.target.checked)}
            />
            <span>Admins</span>
            </div>

            <div className="flex gap-x-2">
            <input
                type="checkbox"
                className="text-blue-500 border-gray-300 rounded  dark:ring-offset-gray-900 dark:border-gray-700"
                checked={showCustomers}
                onChange={(e) => handleShowCustomersChange(e.target.checked)}
            />
            <span>Customers</span>
            </div>
    </div>
    </>
  )
}
