import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    alert('Registered successfully!');
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
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          backgroundColor: '#ffffff',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <PersonAddIcon sx={{ fontSize: 30, color: '#FF7F50', marginRight: 1 }} />
          <Typography variant="h4" sx={{ color: '#FF7F50' }}>
            Sign Up
          </Typography>
        </Box>

        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: '#FF7F50',
            '&:hover': {
              backgroundColor: '#FF6347',
            },
          }}
          onClick={handleRegister}
        >
          Register
        </Button>

        <Typography align="center" sx={{ mt: 2, color: '#333' }}>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/log')}
            style={{
              color: '#FF7F50',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Log in
          </span>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
