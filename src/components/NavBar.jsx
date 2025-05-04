import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, InputBase, Button, Box, IconButton, Drawer, List, ListItem,
  ListItemText, ListItemIcon,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AddBoxRounded } from '@mui/icons-material';

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const userEmail = localStorage.getItem('userEmail');

  const toggleDrawer = (open) => setDrawerOpen(open);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const handleProfileClick = () => {
    navigate(userEmail === 'admin@mariancollege.org' ? '/admin' : '/userpage');
  };

  const handleAddItemClick = () => {
    navigate(isLoggedIn ? '/add' : '/log');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'coral', px: 2, zIndex: 1201, height: '70px' }}>
      <Toolbar sx={{ width: '100%', display: 'flex', alignItems: 'center', height: '100%' }}>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => toggleDrawer(true)} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: 'inherit', textDecoration: 'none', flexGrow: 1 }}
        >
          SwapSmart
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'white', borderRadius: 1, px: 1 }}>
          <InputBase
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            sx={{ ml: 1, flex: 1 }}
          />
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
          <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />}>Home</Button>
          {isLoggedIn ? (
            <>
              <Button color="inherit" onClick={handleProfileClick} startIcon={<AccountCircleIcon />}>Profile</Button>
              <Button color="inherit" onClick={handleLogout} startIcon={<LoginIcon />}>Logout</Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/log" startIcon={<LoginIcon />}>Login</Button>
          )}
          <Button color="inherit" onClick={handleAddItemClick} startIcon={<AddBoxRounded />}>Add Item</Button>
        </Box>
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {isLoggedIn ? (
            <>
              <ListItem button onClick={handleProfileClick}>
                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemIcon><LoginIcon /></ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <ListItem button component={Link} to="/log">
              <ListItemIcon><LoginIcon /></ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          )}
          <ListItem button onClick={handleAddItemClick}>
            <ListItemIcon><AddBoxRounded /></ListItemIcon>
            <ListItemText primary="Add Item" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
