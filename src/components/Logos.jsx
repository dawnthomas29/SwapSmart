import React from 'react';
import { Grid, Typography, Card, CardContent, CardMedia, Box } from '@mui/material';

const Logos = () => {
  return (
    <Box sx={{ py: 4, px: 2 }}>
      
      <Grid container spacing={3} justifyContent="center">
        {[
          { title: 'Borrow Anything', image: 'https://borrowme.com/images/borrow.svg' },
          { title: 'Save Money', image: 'https://borrowme.com/images/save.svg' },
          { title: 'Lend Your Goods', image: 'https://borrowme.com/images/lend.svg' },
          { title: 'Boost Your Business', image: 'https://borrowme.com/images/boost.svg' },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              borderRadius: 2, 
              boxShadow: 3, 
              textAlign: 'center', 
              transition: 'transform 0.3s ease', 
              '&:hover': {
                transform: 'translateY(-5px)', 
                boxShadow: 6,
              }
            }}>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.title}
                title={item.title}
                sx={{ objectFit: 'contain', p: 2 }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
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
