  import React, { useEffect, useState } from 'react';
import SidebarSearch from '@/components/modules/Product/Sidebar/SidebarSearch'
import AppBar from '@mui/material/AppBar';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { parseCookies } from 'nookies';
import { startCase } from 'lodash';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setShoppingCarts } from '@/redux/actions';

const pages = ['products', 'women', 'men'];
const settings = ['Dashboard', 'Admin Panel', 'Logout'];



// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   width: '100%',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));

function Navbar() {

  const [selectedPage, setSelectedPage] = useState(null);
  const router = useRouter();

  const isProductPage = () => {
    return router.pathname.startsWith('/products');
  };

  const handleClick = (page) => {
    setSelectedPage(page);
  };

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const queryClient = useQueryClient();

    let { data } = useQuery('UserInfo', () =>
    axios.get('http://localhost:3000/api/auth/info').then((res) => res.data))

    const handleOpenMenu = (event) => {
      if(event.target.innerHTML === 'Logout'){
        axios.get('http://localhost:3000/api/auth/logout')
        queryClient.setQueryData('UserInfo', undefined)
        window.location.reload();
      }
      else if(event.target.innerHTML === 'Dashboard'){
        router.push('/dashboard/user/profile');
      }
      else if(event.target.innerHTML === 'Admin Panel'){
        router.push('/dashboard/admin/assessment');
      }
    };

    const dispatch = useDispatch();
    const shoppingCarts = useSelector(state => state.shoppingCarts);
    const cartsQty = useSelector(state => state.cartsQty);

    const handleShoppingCarts = ()=>{      
      if (shoppingCarts) {
        dispatch(setShoppingCarts(false));
      }else{
        dispatch(setShoppingCarts(true));
      }
    }

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const storedDarkMode = localStorage.getItem("darkMode");
        if (storedDarkMode) {
            setDarkMode(storedDarkMode === "true");
        }
    }, []);

    return (
        <AppBar position="sticky" className='px-[1rem] top-0 bg-white dark:bg-gray-900' sx={{ backgroundColor: 'white', boxShadow: 'none'}}>
            <Toolbar disableGutters >

            <Box sx={{ display: { xs: 'none', md: 'block' } }} >
            <Link href="/">
            <img src='https://seeklogo.com/images/A/amiri-logo-0A19AA90E1-seeklogo.com.png'
            loading="lazy"
            alt='AMIRI'
            className="w-auto h-6 sm:h-7 mr-3 dark:invert"
            />
            </Link>
            </Box>
    

              <Box sx={{ display: { xs: 'flex', md: 'none' } }} >
                <IconButton 
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  className='text-black dark:text-white'
                >
                  <MenuIcon />
                </IconButton >
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                    display: { xs: 'block', md: 'none' },
                    }}
                    className="bg-[#0000008f] navbar"
                    >
                    {pages.map((page) => (
                    <Link href={page === 'products' ? '/products':`/products/${page}`}>
                    <MenuItem key={page} onClick={handleCloseNavMenu} 
                    style={{
                      color: (isProductPage() && router.pathname === `/products/${page}`) || (page === 'products' && router.pathname === '/products') ? 'white' : 'black',
                      backgroundColor: (isProductPage() && router.pathname === `/products/${page}`) || (page === 'products' && router.pathname === '/products') ? 'black' : 'transparent', 
                    }}>
                        <Typography textAlign="center">{startCase(page)}</Typography>
                    </MenuItem>
                    </Link>
                    ))}
                    <SidebarSearch/>
                </Menu>
              </Box>
    
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                    flexGrow:1,
                  display: { xs: 'flex', md: 'none' },
                  fontFamily: 'roboto',
                  fontWeight: 'bold',
                  fontSize: '2rem',
                  letterSpacing: '0.5rem',
                  textDecoration: 'none',
                }}
                className='text-black dark:text-white'
              >
                AMIRI
              </Typography>
    
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Link href={page === 'products' ? '/products' : `/products/${page}`} key={page}>
                  <Button
                    className='text-black dark:text-white'
                    onClick={() => handleClick(page)}
                    sx={{
                      my: 2,
                      display: 'block',
                      fontSize: '1rem',
                    }}
                    style={{
                      color: !darkMode? (isProductPage() && router.pathname === `/products/${page}`) || (page === 'products' && router.pathname === '/products') ? 'white' : 'black':
                      (isProductPage() && router.pathname === `/products/${page}`) || (page === 'products' && router.pathname === '/products') ? 'black' : 'white',
                      backgroundColor: !darkMode? (isProductPage() && router.pathname === `/products/${page}`) || (page === 'products' && router.pathname === '/products') ? 'black' : 'transparent': (isProductPage() && router.pathname === `/products/${page}`) || (page === 'products' && router.pathname === '/products') ? 'white' : 'transparent', 
                    }}                    
                  >
                    {page}
                  </Button>
                </Link>
              ))}
              </Box>


              {/* Cart */}
              {/* <LocalMallIcon sx={{ color: '#585858', fontSize: '2.5rem', marginRight: '1rem'}}/> */}
              
              {/* Avatar and User Settings */}
              <div className='mr-3 hidden md:block'>
              <SidebarSearch/>
              </div>

              <Box>
                  { data === undefined ? (
                    
                    <Tooltip title="Signup">
                      <a href='/signup'>
                  <IconButton onClick={(event)=>{setAnchorElUser(event.currentTarget); localStorage.removeItem("darkMode");}} sx={{ p: 0 }}>
                      <Avatar alt="" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                      </a>
                </Tooltip>
                  ) : (
                    <div className='flex gap-x-5 items-center'>

                  <button onClick={handleShoppingCarts} className="mt-2 lg:mt-0 relative z-50 inline-flex justify-center items-center h-[2.5rem] w-[2.5rem] 
                  lg:h-[2.8rem] lg:w-[3rem]
                  text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  <svg className="flex-shrink-0 w-[1.9rem] lg:w-[2.2rem]"  fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.312 7.94a1.49 1.49 0 0 0-1.062-.44h-3v-.75a5.25 5.25 0 1 0-10.5 0v.75h-3A1.5 1.5 0 0 0 2.25 9v10.125c0 1.828 1.547 3.375 3.375 3.375h12.75c.884 0 1.734-.346 2.366-.963a3.256 3.256 0 0 0 1.009-2.353V9a1.489 1.489 0 0 0-.438-1.06ZM8.25 6.75a3.75 3.75 0 0 1 7.5 0v.75h-7.5v-.75Zm9 4.5a5.25 5.25 0 1 1-10.5 0v-.75a.75.75 0 1 1 1.5 0v.75a3.75 3.75 0 0 0 7.5 0v-.75a.75.75 0 1 1 1.5 0v.75Z" />
                  </svg>
                  <span className="absolute top-0 end-0 inline-flex items-center py-0.5 px-[0.5rem] rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-red-500 text-white">{cartsQty}</span>
                  </button>

                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={data.fullname} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                    <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  >
                {settings.map((setting) => (

// Admin Panel

                  data.role === 'admin' ?
                  <MenuItem key={setting} style={{ padding: '0'}} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" style={{ padding: '10px 30px', width: '100%', height:'100%'}} onClick={handleOpenMenu}>{setting}</Typography>
                  </MenuItem>
                  : data.role === 'customer' ?
                    setting !== 'Admin Panel' &&
                    <MenuItem key={setting} style={{ padding: '0'}} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" style={{ padding: '10px 30px', width: '100%', height:'100%'}} onClick={handleOpenMenu}>{setting}</Typography>
                    </MenuItem>
                    : null

                  ))}
                </Menu>
              </div>
                  )
                  }
              </Box>
            </Toolbar>
        </AppBar>
      );
    }
    
    export default Navbar;