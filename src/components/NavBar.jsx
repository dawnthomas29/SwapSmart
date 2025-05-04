import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, InputBase, Button, Box, IconButton, Drawer, List, ListItem,
  ListItemText, ListItemIcon,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import MicIcon from '@mui/icons-material/Mic';
import FeedbackIcon from '@mui/icons-material/Feedback';
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
  const handleClearSearch = () => setSearchTerm('');
  const handleChange = (e) => setSearchTerm(e.target.value);

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition API not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
    };

    recognition.start();
  };

  const handleMenuItemClick = (route) => {
    toggleDrawer(false);
    navigate(route);
  };

  const handleAddItemClick = () => {
    if (!isLoggedIn) {
      navigate('/log');
    } else {
      navigate('/add');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/');
  };
  const handleProfileClick = () => {
    // Debugging step: Log the email to check its value
    console.log("User Email:", userEmail);

    // Check if the user is an admin by their email
    if (userEmail === 'admin@mariancollege.org') {
      navigate('/admin');  // Redirect to admin page if it's the admin email
    } else {
      navigate('/userpage');  // Redirect to user profile page for regular users
    }
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
      <br /><br /><br />
      <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
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
            <ListItem button component={Link} to="/feedback" onClick={() => handleMenuItemClick('/feedback')}>
              <ListItemIcon>
                <FeedbackIcon />
              </ListItemIcon>
              <ListItemText primary="Feedback" />
            </ListItem>
            <ListItem button component={Link} to="/contact" onClick={() => handleMenuItemClick('/support')}>
              <ListItemIcon>
                <SupportAgentIcon />
              </ListItemIcon>
              <ListItemText primary="Help & Support" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
     </AppBar>
  );
};

export default NavBar;
