import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Container,
  Typography,
  TextField,
  Link,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Contact() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
   
    if (location.state?.fromSuccess) {
      setSnackbar({
        open: true,
        message: "Your message has been sent successfully! We'll get back to you soon.",
        severity: 'success',
      });
    }
  }, [location.state]);

  const handleCallAdminClick = () => {
    setShowPhoneNumber(!showPhoneNumber);
    setShowEmailForm(false);
  };

  const handleSendEmailClick = () => {
    setShowEmailForm(true);
    setShowPhoneNumber(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const complaint = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(complaint),
      });

      if (response.ok) {
        navigate('/contact', { state: { fromSuccess: true } });
      } else {
        setSnackbar({
          open: true,
          message: 'Failed to submit complaint.',
          severity: 'error',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setSnackbar({
        open: true,
        message: 'An error occurred. Please try again later.',
        severity: 'error',
      });
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: '#ffffff',
        mt: 5,
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ color: 'coral', fontWeight: 'bold', mb: 2 }}
      >
        Contact Admin
      </Typography>

      <Link
        component="button"
        underline="hover"
        onClick={handleCallAdminClick}
        sx={{ display: 'block', mb: 1, color: 'coral', fontWeight: 500 }}
      >
        📞 Call Admin Now
      </Link>
      {showPhoneNumber && (
        <Typography variant="body1" sx={{ mb: 2 }}>
          📱 98876 78765
        </Typography>
      )}

      <Link
        component="button"
        underline="hover"
        onClick={handleSendEmailClick}
        sx={{ color: 'coral', fontWeight: 500 }}
      >
        📧 Send an Email
      </Link>

      {showEmailForm && (
        <Box
          mt={3}
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            name="name"
            fullWidth
            label="Your Name"
            margin="normal"
            required
          />
          <TextField
            name="email"
            fullWidth
            label="Your Email"
            margin="normal"
            required
            type="email"
          />
          <TextField
            name="message"
            fullWidth
            label="Message"
            multiline
            rows={4}
            margin="normal"
            required
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              mt: 2,
              backgroundColor: 'coral',
              '&:hover': { backgroundColor: '#e6735b' },
            }}
          >
            Send Message
          </Button>
        </Box>
      )}

    
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
