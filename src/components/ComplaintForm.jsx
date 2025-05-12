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
          sx={{ color: '#00b8a8', fontWeight: 'bold', mb: 2 }}
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
            backgroundColor: '#00b8a8',
            color: '#ffffff',
            '&:hover': { backgroundColor: '#00b8a8' },
          }}
        >
          Submit
        </Button>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            mt: 2,
            color: '#00b8a8',
            borderColor: '#00b8a8',
            '&:hover': {
              borderColor: '#00b8a8',
              color: '#00b8a8',
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