import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '@/redux/actions';

export default function ProductsSort() {

  const dispatch = useDispatch();
  const selectedSortBy = useSelector((state:any) => state.selectedSortBy);

  const handleChange = (event) => {
    dispatch(setSortBy(event.target.value));
  };
  
  return (
    <>
    <FormControl className='w-full'>
        <Select
          value={selectedSortBy}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          className='bg-white'
        >
          <MenuItem value="">
            <em>Default</em>
          </MenuItem>

         <MenuItem  value='cheapest'>Cheapest</MenuItem>
         <MenuItem  value='expensive'>Most Expensive</MenuItem>

        </Select>
    </FormControl>
    </>
  )
}

