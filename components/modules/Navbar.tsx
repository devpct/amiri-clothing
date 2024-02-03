import React, { useEffect } from 'react';
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

const pages = ['Products', 'Women', 'Men', 'Search'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Navbar() {

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
    axios.get('/api/auth/info').then((res) => res.data))

    const handleOpenMenu = (event) => {
      if(event.target.innerHTML === 'Logout'){
        axios.get('/api/auth/logout')
        queryClient.setQueryData('UserInfo', undefined)
      }
    };

    return (
        <AppBar position="sticky" className='px-[1rem] top-0' sx={{ backgroundColor: 'white', boxShadow: 'none'}}>
            <Toolbar disableGutters >

            <Box sx={{ display: { xs: 'none', md: 'block' } }} >
            <Link href="/">
            <img src='https://seeklogo.com/images/A/amiri-logo-0A19AA90E1-seeklogo.com.png'
            loading="lazy"
            alt='AMIRI'
            className="w-auto h-6 sm:h-7 mr-3"
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
                  color="inherit"
                >
                  <MenuIcon sx={{ color: 'black'}} />
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
                        page === 'Search' ? 
                        <TextField id="standard-basic" label="Search" style={{ width: 'w-webkit-fill-available', margin: '5px' }}/>
                        :
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                    ))}
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
                  color: 'black',
                  textDecoration: 'none',
                }}
              >
                AMIRI
              </Typography>
    
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  page !== 'Search' &&
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'black', display: 'block', fontSize: '1rem' }} 
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <Box sx={{display: { xs: 'none', md: 'flex' }, marginRight: '1rem'}}>
                <AppBar position="static" style={{ width: 'fit-content', backgroundColor: '#585858', boxShadow: 'none' }}>
                    <Search style={{ marginLeft: '0'}} >
                      <SearchIconWrapper >
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                      />
                    </Search>
                </AppBar>
              </Box>

              {/* Cart */}
              {/* <LocalMallIcon sx={{ color: '#585858', fontSize: '2.5rem', marginRight: '1rem'}}/> */}
              
              {/* Avatar and User Settings */}
              <Box>
                  { data === undefined ? (
                    
                    <Tooltip title="Signup">
                      <Link href='/signup'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                      </Link>
                </Tooltip>
                  ) : (
                    <>
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
                  <MenuItem key={setting} style={{ padding: '0'}} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" style={{ padding: '10px 30px', width: '100%', height:'100%'}} onClick={handleOpenMenu}>{setting}</Typography>
                  </MenuItem>
                  ))}
                </Menu>
              </>
                  )
                  }
              </Box>
            </Toolbar>
        </AppBar>
      );
    }
    
    export default Navbar;