import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  AppBar,
  Toolbar,
} from '@mui/material';

export default function ComplaintForm() {
  const navigate = useNavigate();

  return (
    <>
    <br/><br/>
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
          Customer Support
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Name"
          variant="outlined"
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          variant="outlined"
          required
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          margin="normal"
          label="Message"
          variant="outlined"
          required
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: 'coral',
            color: '#ffffff',
            '&:hover': { backgroundColor: '#e6735b' },
          }}
        >
          Submit
        </Button>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            mt: 2,
            color: 'coral',
            borderColor: 'coral',
            '&:hover': {
              borderColor: '#e6735b',
              color: '#e6735b',
            },
          }}
          onClick={() => navigate('/contact')}
        >
          Contact Us
        </Button>
      </Container>
    </>
  );
}
