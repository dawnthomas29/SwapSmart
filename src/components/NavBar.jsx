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
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // ✅ New icon import

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const navigate = useNavigate();

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

  const handleMenuItemClick = (item, route) => {
    setSelectedMenuItem(item);
    toggleDrawer(false);
    navigate(route);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'coral', px: 2, zIndex: 1201 }}>
      <Toolbar sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
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
                    <IconButton
                      onClick={handleVoiceSearch}
                      sx={{ color: isListening ? 'green' : 'inherit' }}
                    >
                      <MicIcon />
                    </IconButton>
                  </InputAdornment>
                </>
              ),
            }}
          />
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
        &nbsp;

          <Button
            color="inherit"
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
          >
            Home
          </Button>
          <Button
        color="inherit"
        component={Link}
        to="/userpage"
         startIcon={<AccountCircleIcon />}
        sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}>
            You
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/log"
            startIcon={<LoginIcon />}
            sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
          >
            Login
          </Button>
        </Box>
      </Toolbar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <br /><br /><br />
        <List sx={{ width: 250 }}>
          <ListItem
            button
            onClick={() => handleMenuItemClick('home', '/')}
            sx={{
              backgroundColor: selectedMenuItem === 'home' ? 'coral' : 'transparent',
              '&:hover': { backgroundColor: 'coral' },
            }}
          >
            <ListItemIcon>
              <HomeIcon sx={{ color: selectedMenuItem === 'home' ? 'white' : 'black' }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleMenuItemClick('login', '/log')}
            sx={{
              backgroundColor: selectedMenuItem === 'login' ? 'coral' : 'transparent',
              '&:hover': { backgroundColor: 'coral' },
            }}
          >
            <ListItemIcon>
              <LoginIcon sx={{ color: selectedMenuItem === 'login' ? 'white' : 'black' }} />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleMenuItemClick('userpage', '/userpage')}
            sx={{
              backgroundColor: selectedMenuItem === 'userpage' ? 'coral' : 'transparent',
              '&:hover': { backgroundColor: 'coral' },
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon sx={{ color: selectedMenuItem === 'userpage' ? 'white' : 'black' }} />
            </ListItemIcon>
            <ListItemText primary="You" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleMenuItemClick('userpage', '/userpage')}
            sx={{
              backgroundColor: selectedMenuItem === 'contact' ? 'coral' : 'transparent',
              '&:hover': { backgroundColor: 'coral' },
            }}
          >
            <ListItemIcon>
              <SupportAgentIcon sx={{ color: selectedMenuItem === 'contact' ? 'white' : 'black' }} />
            </ListItemIcon>
            <ListItemText primary="Help & Support" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleMenuItemClick('feedback', '/feedback')}
            sx={{
              backgroundColor: selectedMenuItem === 'feedback' ? 'coral' : 'transparent',
              '&:hover': { backgroundColor: 'coral' },
            }}
          >
            <ListItemIcon>
              <FeedbackIcon sx={{ color: selectedMenuItem === 'feedback' ? 'white' : 'black' }} />
            </ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItem>
      
        </List>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
