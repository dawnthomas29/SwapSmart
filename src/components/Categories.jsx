import React from 'react';
import { Box, Typography } from '@mui/material';

const Categories = () => {
  const categories = [
    { name: 'Electronics', image: '/electronics.jpg' },
    { name: 'Books', image: '/books.jpg' },
    { name: 'Clothing', image: '/clothing.jpg' },
    { name: 'Home', image: '/home.jpg' },
    { name: 'Sports', image: '/sports.jpg' },
    { name: 'Stationery', image: '/stationary.jpg' }
  ];

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        padding: 0,
        margin: 0,  // Remove any margins here
        boxShadow: 1,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100vw',
        height: '60px',  // Adjusted height here
        position: 'relative',
        top: 0,
      }}
    >
      {categories.map((category, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            margin: '5px',  // Adjusted margin for spacing between categories
            width: '80px',  // Adjusted width of the category box
            transition: 'transform 0.3s ease, opacity 0.3s ease',  // Smooth transition for scaling and opacity change
            '&:hover': {
              transform: 'scale(1.1)',  // Scale up on hover
              opacity: 1,  // Make it fully opaque on hover
            }
          }}
        >
          <img
            src={category.image}
            alt={`${category.name} category`}
            style={{
              width: '100%',
              height: '40px',  // Adjusted image height to fit the reduced div height
              objectFit: 'cover',
              borderRadius: '3px',
            }}
          />
          <Typography
            variant="body2"  // Changed to body2 for slightly larger font size
            sx={{
              fontWeight: 'bold',
              fontSize: '10px',  // Reduced font size for a better fit
              marginTop: '4px',
              lineHeight: 1,
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {category.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Categories;
