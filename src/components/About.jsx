import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function About() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: '40px 20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        marginTop: '20px',
        textAlign: 'center',
      }}
    >
      <Box>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#333' }}
        >
          About SwapSmart
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ lineHeight: 1.8, fontSize: '1.1rem', color: '#555' }}
        >
          Welcome to SwapSmart, your one-stop platform for smart and seamless product exchanges. 
          Our mission is to connect people and businesses, enabling them to trade items efficiently 
          while fostering a sustainable and eco-friendly community. Whether you're looking to swap, 
          sell, or discover new products, SwapSmart is here to make the process simple and enjoyable.
        </Typography>
      </Box>
    </Container>
  );
}

export default About;