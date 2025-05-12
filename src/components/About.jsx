import React from 'react';
import { Container, Typography, Box, Divider, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

function About() {

  return (
    <Box sx={{ backgroundColor: '#f4f0ec', py: 8, px: 2, width: '100%',mt:10 }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Box sx={{ mb: 4 }}>
          <InfoIcon sx={{ fontSize: 50, color: '#1976d2' }} />
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333', mt: 2 }}>
            About SwapSmart
          </Typography>
          <Divider sx={{ my: 2, width: '80%', mx: 'auto', backgroundColor: '#1976d2' }} />
          <Typography
            variant="h6"
            sx={{
              lineHeight: 1.9,
              fontSize: '1.15rem',
              color: '#555',
              px: { xs: 1, sm: 4 },
            }}
          >
            Welcome to <strong>SwapSmart</strong>, your smart and seamless platform for product exchange.
            We aim to foster a sustainable and eco-friendly community by enabling individuals and businesses
            to trade, lend, and discover items effortlessly.
          </Typography>
        </Box>

        <Box sx={{ mt: 6 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: '1.05rem',
              color: '#444',
              mb: 2,
            }}
          >
            Whether you’re looking to lend, borrow, or explore new items, SwapSmart simplifies the process.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default About;
