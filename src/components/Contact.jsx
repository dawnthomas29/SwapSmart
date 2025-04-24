import React, { useState } from 'react';
import {
  Button,
  Box,
  Container,
  Typography,
  TextField,
  Link,
} from '@mui/material';

export default function Contact() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  const handleCallAdminClick = () => {
    setShowPhoneNumber(!showPhoneNumber);
    setShowEmailForm(false); // Hide email form when phone number is toggled
  };

  const handleSendEmailClick = () => {
    setShowEmailForm(true);
    setShowPhoneNumber(false); // Hide phone number when email form is shown
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

      {/* Link to show phone number */}
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

      {/* Link to show email form */}
      <Link
        component="button"
        underline="hover"
        onClick={handleSendEmailClick}
        sx={{ color: 'coral', fontWeight: 500 }}
      >
        📧 Send an Email
      </Link>

      {/* Display email form when 'Send an Email' is clicked */}
      {showEmailForm && (
        <Box
          mt={3}
          component="form"
          action="mailto:admin@example.com"
          method="post"
          encType="text/plain"
        >
          <TextField
            fullWidth
            label="Your Name"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Your Email"
            margin="normal"
            required
            type="email"
          />
          <TextField
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
            Send Email
          </Button>
        </Box>
      )}
    </Container>
  );
}
