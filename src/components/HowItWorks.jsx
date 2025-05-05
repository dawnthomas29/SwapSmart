import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

const steps = [
  {
    title: '1. Search',
    description: 'Search for a product near you',
    image: '/search.jfif', // Replace with actual image paths
  },
  {
    title: '2. Contact Owner',
    description: 'Message the product owner to ask about availability',
    image: '/contact.jfif',
  },
  {
    title: '3. Confirm Order',
    description: 'Confirm with the owner and finalize the booking',
    image: '/borrow.jfif',
  },
  {
    title: '4. Use & Return',
    description: 'Use the item and return it on time',
    image: '/return.jfif',
  },
];

const HowItWorks = () => {
  return (
    <Box sx={{ backgroundColor: '#121212', color: 'white', py: 6, px: 2 }}>
      <Typography variant="h4" textAlign="center" sx={{ mb: 3 }}>
        How does <span style={{ color: '#A259FF' }}>SwapSmart</span> work? 
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {steps.map((step, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ backgroundColor: '#1E1E1E', color: 'white', borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <img
                  src={step.image}
                  alt={step.title}
                  style={{ width: '100%', maxWidth: '150px', marginBottom: 10 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{step.title}</Typography>
                <Typography variant="body2">{step.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center" mt={4}>
        <Typography mt={2} sx={{ color: '#ccc' }}>
          Read our FAQ to learn more
        </Typography>
      </Box>
    </Box>
  );
};

export default HowItWorks;
