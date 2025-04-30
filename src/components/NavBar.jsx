import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  InputAdornment
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
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
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
          sx={{ color: 'inherit', textDecoration: 'none', whiteSpace: 'nowrap', flexGrow: 1 }}
        >
          SwapSmart
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Search for products"
            value={searchTerm}
            onChange={handleChange}
            sx={{
              backgroundColor: 'white',
              maxWidth: '300px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '85px',
                height: '38px',
                paddingRight: 1,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '& .MuiInputBase-input': {
                padding: '8px 14px',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {searchTerm && (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClearSearch}>
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  )}
                  <InputAdornment position="end">
                    <IconButton onClick={handleVoiceSearch} sx={{ color: isListening ? 'green' : 'inherit' }}>
                      <MicIcon />
                    </IconButton>
                  </InputAdornment>
                </>
              ),
            }}
          />
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
          &nbsp;  &nbsp;  &nbsp;
          <Button
            color="inherit"
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
          >
            Home
          </Button>
          {isLoggedIn ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/userpage"
                startIcon={<AccountCircleIcon />}
                sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
              >
                Profile
              </Button>
              <Button
                color="inherit"
                onClick={handleLogout}
                startIcon={<LoginIcon />}
                sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/log"
              startIcon={<LoginIcon />}
              sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
            >
              Login
            </Button>
          )}
          <Button
            color="inherit"
            onClick={handleAddItemClick}
            startIcon={<AddBoxRounded />}
            sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
          >
            Add Item
          </Button>
        </Box>
      </Toolbar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <br /><br /><br />
        <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
          <List>
            <ListItem button component={Link} to="/" onClick={() => handleMenuItemClick('/')}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            {isLoggedIn ? (
              <>
                <ListItem button component={Link} to="/userpage" onClick={() => handleMenuItemClick('/userpage')}>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            ) : (
              <ListItem button component={Link} to="/log" onClick={() => handleMenuItemClick('/log')}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            )}
            <ListItem button onClick={handleAddItemClick}>
              <ListItemIcon>
                <AddBoxRounded />
              </ListItemIcon>
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
