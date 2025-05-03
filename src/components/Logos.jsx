import React from 'react';
import { Grid, Typography, Card, CardContent, CardMedia, Box } from '@mui/material';

const Logos = () => {
  return (
    <Box sx={{ py: 8, px: 16, backgroundColor: '#f4f0ec ' }}> {/* Transparent background added */}
      
      {/* Heading + Enlarged Image Row */}
      <Grid container alignItems="center" spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              color: '#0A0A48',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              lineHeight: 1.2,
              pr: { md: 2 },
              mb: 1,
            }}
          >
            Why buy when<br />
            you can <Box component="span" sx={{ color: '#2AC7B5' }}>borrow?</Box>
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
        <Box
  component="img"
  src="https://borrowme.com/images/homepage.svg"
  alt="Borrow Illustration"
  sx={{
    width: { xs: '250px', sm: '40px', md: '500px' },
    display: 'block',
    mx: 'auto', // You can remove this if you're aligning to the right
    mt:-20,
    ml:50,
     // Aligns the image to the right
  }}
/>

        </Grid>
      </Grid>

      {/* Logos Grid Section */}
      <Grid container spacing={6} justifyContent="center">
        {[
          { title: 'Borrow Anything', image: 'https://borrowme.com/images/borrow.svg' },
          { title: 'Save Money', image: 'https://borrowme.com/images/save.svg' },
          { title: 'Lend Your Goods', image: 'https://borrowme.com/images/lend.svg' },
          { title: 'Boost Your Business', image: 'https://borrowme.com/images/boost.svg' },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                textAlign: 'center',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <CardMedia
                component="img"
                height="110"
                image={item.image}
                alt={item.title}
                title={item.title}
                sx={{ objectFit: 'contain', p: 1 }}
              />
              <CardContent sx={{ paddingBottom: '8px' }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 'bold', color: '#333', fontSize: '1rem' }}
                >
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Logos;
