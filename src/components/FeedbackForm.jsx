// components/Feedback.js

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const FeedbackForm = ({ onSubmitFeedback }) => {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = { name, feedback }; // Removed email
    onSubmitFeedback(newFeedback);
    setFeedback('');
    setName('');
    alert('Thank you for your feedback!');
  };

  return (
    <Container maxWidth="sm" sx={{ padding: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: '20px',
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: 'coral' }}>
          Submit Your Feedback
        </Typography>

        <TextField
          label="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ marginBottom: '16px' }}
        />

        <TextField
          label="Your Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{ marginBottom: '16px' }}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ backgroundColor: 'coral', '&:hover': { backgroundColor: '#e6735b' } }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default FeedbackForm;
