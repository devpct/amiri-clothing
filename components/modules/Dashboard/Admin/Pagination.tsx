import React from 'react';
import Pagination from '@mui/material/Pagination';

export default function Paginations({ perPage, total, paginate }:{ perPage:any, total:any, paginate:any }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center w-full mt-4 ">
      <Pagination
        count={pageNumbers.length}
        onChange={(event, page) => paginate(page)}
        variant="outlined"
        shape="rounded"
        className='dark:bg-white dark:rounded-lg'
      />
    </div>
  );
}
