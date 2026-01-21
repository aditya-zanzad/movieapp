import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  IconButton,
  Box,
  styled,
  alpha,
  Select,
  MenuItem,
  Divider,
  Menu,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#121212',
  color: '#fff',
  boxShadow: 'none',
  padding: '0 5%',
}));

const Logo = styled(Box)(({ theme }) => ({
  backgroundColor: '#f5c518',
  color: '#000',
  borderRadius: '4px',
  padding: '2px 8px',
  fontWeight: 'bold',
  fontSize: '1.2rem',
  cursor: 'pointer',
  marginRight: theme.spacing(2),
  '&:hover': {
    backgroundColor: '#e2b616',
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#fff',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
  height: '32px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#757575',
  cursor: 'pointer',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#000',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(0.5, 1, 0.5, 1),
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '0.9rem',
  },
}));

const NavbarButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.9rem',
  margin: '0 8px',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
}));

const CategorySelect = styled(Select)(({ theme }) => ({
  height: '32px',
  backgroundColor: '#fff',
  borderRight: '1px solid #ccc',
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  fontSize: '0.8rem',
  '& .MuiSelect-select': {
    padding: '0 8px',
    display: 'flex',
    alignItems: 'center',
  },
  '& fieldset': {
    border: 'none',
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <Toolbar variant="dense" sx={{ minHeight: '56px' }}>
          {/* Logo */}
          <Logo component="div" onClick={() => navigate('/')}>
            IMDb
          </Logo>

          {/* Menu Button */}
          <NavbarButton startIcon={<MenuIcon />}>
            Menu
          </NavbarButton>

          {/* Search Bar */}
          <Search onClick={() => navigate('/search')}>
            <CategorySelect
              value="All"
              variant="outlined"
              displayEmpty
              IconComponent={() => <ArrowDropDownIcon sx={{ fontSize: '1.2rem', marginLeft: '-4px' }} />}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Titles">Titles</MenuItem>
            </CategorySelect>
            <StyledInputBase
              placeholder="Search IMDb"
              inputProps={{ 'aria-label': 'search' }}
              readOnly
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </Search>

          {/* Right side items */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {isAdmin() && (
              <NavbarButton onClick={() => navigate('/admin/add')} sx={{ color: '#f5c518' }}>
                Add Movie
              </NavbarButton>
            )}
            
            <NavbarButton sx={{ fontWeight: 800 }}>
              IMDbPro
            </NavbarButton>
            
            <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.2)', mx: 1, my: 1.5 }} />
            
            <NavbarButton startIcon={<BookmarkAddIcon />}>
              Watchlist
            </NavbarButton>

            {user ? (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile ({user.name})</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <NavbarButton onClick={() => navigate('/login')}>
                Sign In
              </NavbarButton>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                EN
              </Typography>
              <ArrowDropDownIcon />
            </Box>
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton color="inherit" onClick={() => navigate('/search')}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};

export default Navbar;
