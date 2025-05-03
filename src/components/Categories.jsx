import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const Categories = () => {
  const categories = [
    { name: 'Electronics', image: '/electronics.jpg' },
    { name: 'Books', image: '/books.jpg' },
    { name: 'Clothing', image: '/clothing.jpg' },
    { name: 'Home', image: '/home.jpg' },
    { name: 'Sports', image: '/sports.jpg' },
    { name: 'Stationery', image: '/stationary.jpg' },
  ];

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        px: 2,
        py: 1,
        margin: { xs: 1, sm: 4, md: 8 },
        boxShadow: 0,
        display: 'flex',
        justifyContent: { xs: 'center', sm: 'space-around' },
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '96.5vw',
        borderRadius: 0,
        minHeight: '10px',
      }}
    >
      {categories.map((category, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              m: 2,
              width: { xs: 90, sm: 100, md: 110 },
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
                opacity: 1,
              },
            }}
          >
            <img
              src={category.image}
              alt={`${category.name} category`}
              style={{
                width: '100%',
                height: '40px',
                objectFit: 'cover',
                borderRadius: '4px',
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '10px', sm: '11px' },
                mt: '4px',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              {category.name}
            </Typography>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
};

export default Categories;
