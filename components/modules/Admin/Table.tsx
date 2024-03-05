import { Avatar, IconButton } from '@mui/material';
import { startCase } from 'lodash';
import React from 'react'

export default function Table({ selected, setSelected, data, columnNames, title }) {

    const toggleSelection = (mainId) => {
        if (selected.includes(mainId)) {
            setSelected(selected.filter((id) => id !== mainId));
        } else {
            setSelected([...selected, mainId]);
        }
      };
    
      const toggleSelectAll = () => {
        if (selected.length === data.length) {
          setSelected([]);
        } else {
          const allIds = data.map(data => data.id);
          setSelected(allIds);
        }
      };

  return (
    <>
    <div className="flex flex-col mt-6">
        <div className="">
        <div className="inline-block w-full py-2 align-middle  ">
            <div className=" overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
            <table className="relative min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className=" bg-gray-50 dark:bg-gray-800">
                <tr>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-x-3">
                        <input
                        type="checkbox"
                        className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                        checked={selected.length === data?.length}
                        onChange={toggleSelectAll}
                        />
                        <span>{columnNames[0]}</span>
                    </div>
                    </th>
                    <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">{columnNames[1]}</th>
                    {
                     columnNames.slice(2,columnNames.length).map(name =>(
                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">{name}</th>
                     ))
                    }
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {data?.length > 0 ? (
                    data.map(data => (
                    <tr
                        key={data.id}
                        className={`${
                        selected.includes(data.id)
                            ? 'bg-blue-100'
                            : ''
                        }`}
                        onClick={() => toggleSelection(data.id)}
                    >
                    {
                        title === 'users' ?
                        <>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center gap-x-3">
                            <input type="checkbox" className=" border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                            checked={selected.includes(data.id)}
                            onChange={() => toggleSelection(data.id)}
                            />
                            <div className="flex items-center gap-x-2">
                            <IconButton>
                                <Avatar alt={data.fullname} src="/static/images/avatar/2.jpg" />
                            </IconButton>
                            <div>
                                <h2 className="font-medium text-gray-800 dark:text-white ">{data.fullname}</h2>
                            </div>
                            </div>
                        </div>
                        </td>
                        <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        {data.role !== 'admin' ?
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-gray-100/60 dark:bg-gray-800">
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-500"></span>
                            <h2 className="text-sm font-normal text-gray-500">{startCase(data.role)}</h2>
                            </div>
                            :
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                            <h2 className="text-sm font-normal text-emerald-500">{startCase(data.role)}</h2>
                            </div>
                        }
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{data.phonenumber.length > 0 ? data.phonenumber : 'Null'}</td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{data.email}</td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{data.address.length > 0 ? data.address : 'Null'}</td>
                        </>
                    : title === 'products' ?
                    <>
                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div className="inline-flex items-center gap-x-3">
                        <input type="checkbox" className=" border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                        checked={selected.includes(data.id)}
                        onChange={() => toggleSelection(data.id)}
                        />
                        <div className="flex items-center gap-x-2">
                        <div>
                            <h2 className="font-medium text-gray-800 dark:text-white ">{startCase(data.name)}</h2>
                        </div>
                        </div>
                    </div>
                    </td>
                    <td className="grid grid-cols-2 gap-2 items-center text-sm font-medium text-gray-700 whitespace-nowrap">
                    {data.colors_code.map((color, index) => (
                        <div key={index} className="flex items-center px-3 py-1 rounded-full gap-x-2 bg-gray-100 dark:bg-gray-800 w-fit">
                        <span className={`h-3 w-3 rounded-full`} style={{backgroundColor: color}}></span>
                        <h2 className="text-[11px] font-normal text-gray-500">{startCase(data.colors[index])}</h2>
                        </div>
                    ))}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{Number(data.price).toLocaleString()}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {data.images.map((link, index) => (
                        <div key={index}>
                        {link.length <= 50 ? link : link.substring(0, 50) + '...'}
                        </div>
                    ))
                    }
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {data.description.length <= 50 ? data.description : data.description.substring(0, 50) + '...'}
                    </td>
                    <td className="grid grid-cols-2 px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {data.size.map(size => (
                        <div>
                        {size} ,
                        </div>
                    ))
                    }
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{data.category_id}</td>
                    </>
                    : title === 'categories' ?
                    <>
                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div className="inline-flex items-center gap-x-3">
                        <input 
                        type="checkbox" 
                        className="border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                        checked={selected.includes(data.id)}
                        onChange={() => toggleSelection(data.id)}
                        />
                        <div className="flex items-center gap-x-2">
                        <div>
                            <h2 className="font-medium text-gray-800 dark:text-white">{data.id}</h2>
                        </div>
                        </div>
                    </div>
                    </td>
                    <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">{startCase(data.name)}</td>
                    </>
                    : null
                    }
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
    </>
  )
}
