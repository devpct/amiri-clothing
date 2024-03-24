import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';

export default function Navbar({ isOpen, setIsOpen, data }) {

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const storedDarkMode = localStorage.getItem("darkMode");
        if (storedDarkMode) {
            setDarkMode(storedDarkMode === "true");
        }
    }, []);

  return (
    <>
    <div className="bg-white dark:bg-gray-900 w-full px-1 flex items-center  justify-between lg:h-[5rem] h-[4rem]  border-b-1 sticky top-0 z-50 dark:border-gray-500">
    <div className="w-full flex gap-x-1 lg:justify-between items-center">
    <div className='flex items-center '>
    <Link href='/'>
    <IconButton>
        <Avatar alt={data.fullname} src="/static/images/avatar/2.jpg" />
    </IconButton>
    </Link>
    <p className='lg:text-[1.3rem] text-[1rem] font-medium'>{data.fullname}</p>
    <i className="bi bi-amazon"></i>
    </div>

    <div className='items-center gap-x-2 hidden lg:flex'>
    <svg width="24" height="24" fill={darkMode?'white':'black'} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.4 7.2a2.4 2.4 0 0 1 2.4-2.4h14.4a2.4 2.4 0 0 1 2.4 2.4v9.6a2.4 2.4 0 0 1-2.4 2.4H4.8a2.4 2.4 0 0 1-2.4-2.4V7.2ZM4.8 6a1.2 1.2 0 0 0-1.2 1.2v.26L12 12.5l8.4-5.04V7.2A1.2 1.2 0 0 0 19.2 6H4.8Zm15.6 2.86-5.65 3.39 5.65 3.476V8.859Zm-.04 8.25-6.768-4.165L12 13.9l-1.59-.954-6.77 4.164A1.2 1.2 0 0 0 4.8 18h14.4a1.2 1.2 0 0 0 1.159-.888ZM3.6 15.727l5.65-3.477L3.6 8.86v6.867Z"></path>
    </svg>
    <p className="">{data.email}</p>
    </div>
    
    <div className='gap-x-2  items-center hidden lg:flex  pr-4'>
    <svg width="24" height="24" fill={darkMode?'white':'black'} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.567 3.66a.848.848 0 0 0-1.269-.078L4.006 4.875c-.604.605-.826 1.462-.563 2.213a21.96 21.96 0 0 0 5.21 8.26 21.961 21.961 0 0 0 8.26 5.21c.752.264 1.608.041 2.213-.563l1.292-1.292a.85.85 0 0 0-.078-1.269l-2.884-2.242a.849.849 0 0 0-.725-.153l-2.738.684a2.181 2.181 0 0 1-2.07-.574l-3.07-3.071a2.181 2.181 0 0 1-.576-2.071l.685-2.738a.848.848 0 0 0-.152-.725L6.567 3.66ZM4.355 2.64a2.181 2.181 0 0 1 3.265.203l2.242 2.882a2.18 2.18 0 0 1 .394 1.868l-.684 2.737a.847.847 0 0 0 .223.804l3.07 3.071a.848.848 0 0 0 .806.223l2.736-.684a2.181 2.181 0 0 1 1.868.394l2.882 2.242a2.18 2.18 0 0 1 .204 3.264l-1.293 1.293c-.925.925-2.307 1.33-3.596.877A23.292 23.292 0 0 1 7.71 16.29a23.292 23.292 0 0 1-5.525-8.761c-.453-1.288-.047-2.671.878-3.596L4.356 2.64h-.001Z"></path>
    </svg>
    <p className="">{data.phonenumber}</p>
    </div>

    </div>

    <button
      type="button"
      className="text-gray-500 hover:text-gray-600 lg:hidden pr-4"
      onClick={toggleMenu}
    >
      <span className="sr-only">Toggle Navigation</span>
      {isOpen ? (
        <svg
          className="flex-shrink-0 size-6 ml-4"
          fill={darkMode?'white':'black'}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M9.354 8l2.646 2.646a.5.5 0 0 1-.708.708L8 8.707l-3.292 3.293a.5.5 0 1 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 .708-.708L8 7.293l3.292-3.292a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646z"
          />
        </svg>
      ) : (
        <svg
          className="flex-shrink-0 size-6 ml-4"
          fill={darkMode?'white':'black'}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      )}
    </button>

      </div>
    </>
  )
}
