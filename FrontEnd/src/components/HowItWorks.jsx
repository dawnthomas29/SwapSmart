import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';

const borrowSteps = [
  {
    title: '1. Search',
    description: 'Search for a product near to you  ',
    image: '/borrow1.png',
  },
  {
    title: '2. Verify',
    description: 'Verify your profile to become part',
    description1:'of the local sharing community',
    image: '/borrow2.png',
  },
  {
    title: '3. Request',
    description: 'Request from a neighbor, see availability',
    description1:'and book',
    image: '/borrow3.png',
  },
  {
    title: '4. Enjoy',
    description: 'Make use of the item, enjoy, and bring',
    description1:'it back at the arranged time',
    image: '/borrow4.png',
  },
];

const lendSteps = [
  {
    title: '1. Add items',
    description: 'Add items or check what your neighbors',
    description1:'are looking for',
    image: '/lend1.png',
  },
  {
    title: '2. Accept',
    description: 'Check requests from neighbors; accept if',
    description1:'it suits you',
    image: '/lend2.png',
  },
  {
    title: '3. Free or fee',
    description: 'Decide if your listing is free or for a fee',
    image: '/lend3.png',
  },
  {
    title: 'Warranty',
    description:"Accidents rarely happen, but don't worry",
    description1:'Peerby’s warranty has you covered!',
    image: '/lend4.png',
  },
];

const HowItWorks = () => {
  const [mode, setMode] = useState('borrow');
  const steps = mode === 'borrow' ? borrowSteps : lendSteps;

  return (
    <Box sx={{ backgroundColor: '#ffffff', color: '#333', py: 6, px: 2, ml: -15 }}>
      <Typography variant="h4" textAlign="center" sx={{ mb: 3 }}>
        How does <span style={{ color: '#FF7A3D' }}>SwapSmart</span> work?
      </Typography>

      <Box display="flex" justifyContent="center" mb={4}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(e, newMode) => newMode && setMode(newMode)}
          sx={{
            backgroundColor: '#f0f0f0',
            borderRadius: 4,
            '& .MuiToggleButton-root': {
              color: '#444',
              border: 'none',
              px: 4,
              py: 1,
              textTransform: 'capitalize',
              fontSize: '1rem',
            },
            '& .Mui-selected': {
              backgroundColor: '#FF7A3D',
              color: '#fff',
              fontWeight: 'bold',
            },
          }}
        >
          <ToggleButton value="borrow">Borrow</ToggleButton>
          <ToggleButton value="lend">Lend</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {steps.map((step, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex' }}>
            <Card
              sx={{
                backgroundColor: '#fff',
                color: '#333',
                borderRadius: 3,
                boxShadow: 2,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent sx={{ textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <img
                    src={step.image}
                    alt={step.title}
                    style={{ width: '100%', maxWidth: '130px', marginBottom: 10 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {step.title}
                  </Typography>
                </div>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: '#666', wordWrap: 'break-word', maxWidth: '100%' }}
                >
                  {step.description}
                  <br/>
                  {step.description1}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center" mt={4}>
        <Typography mt={2} sx={{ color: '#666' }}>
          Read our FAQ to learn more
        </Typography>
      </Box>
    </Box>
  );
};

export default HowItWorks;
