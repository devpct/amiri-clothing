import { useDispatch } from 'react-redux';
import { setDarkMode } from '@/redux/actions';

export default function Theme({darkMode}) {
  const dispatch = useDispatch();

  return (
    <>
    <div onClick={()=>{dispatch(setDarkMode(!darkMode));}} className='grid w-[3rem] h-[3rem] dark:bg-white dark:text-black bg-black text-white fixed right-5 bottom-5 cursor-pointer rounded-full'>
        <p className='m-auto'>{!darkMode?'DRK':'LGT'}</p>
    </div>
    </>
  )
}
