import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

const Login = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isValidUser, setIsValidUser] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (loginData.username === 'admin' && loginData.password === '123456') {
      alert('Login Successful!');
    } else {
      alert('Username and password isn’t valid');
      setIsValidUser(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          padding: '40px',
          boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
          borderRadius: '12px',
          backgroundColor: '#ffffff',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <LoginIcon sx={{ fontSize: 30, color: '#FF7F50', marginRight: 1 }} />
          <Typography variant="h4" sx={{ color: '#FF7F50' }}>
            Log In
          </Typography>
        </Box>

        <TextField
          name="username"
          label="Username"
          value={loginData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <TextField
          name="password"
          label="Password"
          type="password"
          value={loginData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <Button
          variant="contained"
          onClick={handleLogin}
          fullWidth
          sx={{
            marginTop: '20px',
            padding: '12px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '30px',
            backgroundColor: '#FF7F50',
            '&:hover': {
              backgroundColor: '#FF6347',
            },
          }}
        >
          Log In
        </Button>

        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: '20px', color: '#333' }}
        >
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/reg')}
            style={{
              color: '#FF7F50',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Sign up
          </span>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
