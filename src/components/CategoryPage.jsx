import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';

const CategoryPage = () => {
  const { categoryName } = useParams();
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

  return (
    <Box sx={{ padding: 12 }}>
      <Typography variant="h4" sx={{ mb: 3, color: '#FF7F50', fontWeight: 'bold' ,textAlign: 'center'}}>
        {categoryName} Items
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {items.map((item) => (
          <Card key={item._id} sx={{ width: 250, boxShadow: 2 }}>
            <CardMedia
              component="img"
              height="140"
              image={item.image}
              alt={item.name}
            />
            <CardContent>
              <Typography variant="h6" component="div">{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
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
