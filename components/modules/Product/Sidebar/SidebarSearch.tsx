import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function SidebarSearch() {

  const route = useRouter() 
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
      setSearch(route.query.q as string || '')
  }, [])
  
  const searchHandlerWithEnter = (event) => {
      if (event.keyCode === 13) {
          if (search.trim()) {
              route.push(`/search?q=${search}`)
          }
          if (!search.trim()) {
            route.push('/products')
          }
      }
  }

  const searchHandler = () => {
  if (search.trim()) {
      route.push(`/search?q=${search}`)
  }
  if (!search.trim()) {
    route.push('/products')
  }
  }

  return (
    <>
    <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg  
            onClick={searchHandler}
            className="w-5 h-5 text-gray-400 cursor-pointer" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </span>

        <input 
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onKeyDown={searchHandlerWithEnter}
        type="text" 
        className="w-full py-2 pl-10 pr-4 text-gray-700 border rounded-md  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" 
        placeholder="Search" />
    </div>
    </>
  )
}