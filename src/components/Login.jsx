import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const validate = () => {
    const emailPattern = /^[a-z]+\.\d{2}[a-z]{3}\d{3}@mariancollege\.org$/i;
    const isAdmin = formData.email.toLowerCase() === 'admin@mariancollege.org';

    const isEmailValid = isAdmin || emailPattern.test(formData.email);
    const isPasswordValid = formData.password.length >= 7;
    const isConfirmValid = isLogin || formData.password === formData.confirmPassword;
    const isPhoneValid = isLogin || /^\d{10}$/.test(formData.phone);
    const isNameValid = isLogin || formData.name.trim().length > 0;

    setErrors({
      email: !isEmailValid,
      password: !isPasswordValid,
      confirmPassword: !isConfirmValid,
      phone: !isPhoneValid,
      name: !isNameValid
    });

    return isEmailValid && isPasswordValid && isConfirmValid && isPhoneValid && isNameValid;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      setSnackbar({
        open: true,
        message: 'Use your college email ID and ensure all fields are valid.',
        severity: 'error'
      });
      return;
    }

    try {
      if (isLogin) {
        // Admin shortcut login (no backend check)
        if (
          formData.email.toLowerCase() === 'admin@mariancollege.org' &&
          formData.password === '1234567'
        ) {
          localStorage.setItem('token', 'admin-token'); // optional
          localStorage.setItem('user', JSON.stringify({
            name: 'Admin',
            email: 'admin@mariancollege.org',
            phone: '8848250575',
            role: 'admin'
          }));
          setSnackbar({
            open: true,
            message: 'Admin Login Successful!',
            severity: 'success'
          });
          setTimeout(() => {
            navigate('/admin');
          }, 1500);
          return;
        }

        // Regular user login
        const response = await axios.post('http://localhost:5000/api/users/log', {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        setSnackbar({
          open: true,
          message: 'Login Successful!',
          severity: 'success'
        });

        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        // Registration
        await axios.post('http://localhost:5000/api/users/reg', {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password
        });

        setSnackbar({
          open: true,
          message: 'Registration Successful! Please log in.',
          severity: 'success'
        });

        setTimeout(() => {
          setIsLogin(true);
          navigate('/log');
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Something went wrong!',
        severity: 'error'
      });
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ width: '100%', maxWidth: '400px', padding: '40px', boxShadow: '0px 4px 20px rgba(0,0,0,0.1)', borderRadius: '12px', backgroundColor: '#ffffff' }}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <LoginIcon sx={{ fontSize: 30, color: '#FF7F50', marginRight: 1 }} />
          <Typography variant="h4" sx={{ color: '#FF7F50' }}>
            {isLogin ? 'Log In' : 'Register'}
          </Typography>
        </Box>

        {!isLogin && (
          <>
            <TextField
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              error={errors.name}
              helperText={errors.name && 'Full name is required'}
            />
            <TextField
              name="phone"
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              error={errors.phone}
              helperText={errors.phone && 'Phone must be 10 digits'}
            />
          </>
        )}

        <TextField
          name="email"
          label="College Email ID"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={errors.email}
          helperText={errors.email && 'Use your college email ID'}
        />

        <TextField
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={errors.password}
          helperText={errors.password && 'Password must be at least 7 characters'}
        />

        {!isLogin && (
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            error={errors.confirmPassword}
            helperText={errors.confirmPassword && 'Passwords do not match'}
          />
        )}

        <Button
          variant="contained"
          onClick={handleSubmit}
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
          {isLogin ? 'Log In' : 'Register'}
        </Button>

        <Typography variant="body2" align="center" sx={{ marginTop: '20px', color: '#333' }}>
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{' '}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: '#FF7F50', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </span>
        </Typography>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};
export default Login;
