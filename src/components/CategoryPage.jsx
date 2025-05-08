import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, [categoryName]);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/category/${categoryName}`);
      setItems(res.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  
  const handleCardClick = (item) => {
    navigate(`/item/${item._id}`, { state: { item } });
  };

  return (
    <Box sx={{ padding: { xs: 3, md: 6, }, backgroundColor: '#f9f9f9' }}>
      <Typography
        variant="h4"
        sx={{
          mb: 5,
          color: '#00b8a8',
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: { xs: '1.8rem', md: '2.5rem' },
          mt:10,
        }}
      >
        {categoryName} Items
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
        {items.map((item) => (
          <Card
            key={item._id}
            sx={{
              width: 250,
              height: 400,
              borderRadius: 2,
              boxShadow: 3,
              '&:hover': {
                boxShadow: 6,
                transform: 'scale(1.05)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer',
              },
            }}
            onClick={() => handleCardClick(item)} // Make the card clickable
          >
            <CardMedia
              component="img"
              height="200"
              image={item.image}
              alt={item.name}
              sx={{ objectFit: 'cover', borderRadius: 2 }}
            />
            <CardContent sx={{ backgroundColor: '#fff', padding: 3 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  marginBottom: 1,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: '0.9rem',
                  marginBottom: 2,
                  height: '2.5rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.description}
              </Typography>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  color: 'black',
                }}
              >
                ₹ {item.price}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryPage;
