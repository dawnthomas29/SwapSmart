import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Box,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const ItemList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const items = location.state?.items || [];

  const handleCardClick = (item) => {
    navigate(`/item/${item._id}`, { state: { item } });
  };

  if (!items.length) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6" color="textSecondary">
          No items available.
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f4f0ec', py: 5, px: 10, mt: 5, width: '95.5vw' }}>
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', mb: 5, fontWeight: 'bold', color: '#333' }}
      >
        All Items
      </Typography>

      <Grid container spacing={6}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 2,
                width: 250,
                height: 400,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f9f9f9',
                justifyContent: 'space-between',
                padding: '10px',
                overflow: 'hidden',
                ml: 3,
                cursor: 'pointer',
              }}
              onClick={() => handleCardClick(item)}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                sx={{
                  objectFit: 'contain',
                  height: '150px',
                  width: '100%',
                  marginBottom: 2,
                }}
              />
              <CardContent sx={{ flexGrow: 1, paddingBottom: '10px' }}>
                <Chip
                  label={item.isBorrowed ? 'UNAVAILABLE' : 'AVAILABLE NOW'}
                  size="small"
                  sx={{
                    bgcolor: item.isBorrowed ? '#f44336' : '#E0F2F1',
                    mb: 1,
                  }}
                />
                <Typography variant="h6" noWrap sx={{ fontSize: '1rem' }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" noWrap sx={{ fontSize: '0.85rem' }}>
                  {item.description}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
                  ₹{item.price} /week
                </Typography>
              </CardContent>
              <Box mt="auto" display="flex" justifyContent="space-between" sx={{ padding: '8px 0' }}>
                <Button
                  variant="contained"
                  size="small"
                  disabled={item.isBorrowed}
                  sx={{
                    borderRadius: 20,
                    backgroundColor: item.isBorrowed ? '#ccc' : '#1976d2',
                    '&:hover': {
                      backgroundColor: item.isBorrowed ? '#ccc' : '#115293',
                    },
                    fontSize: '0.8rem',
                    zIndex: 10,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(item);
                  }}
                >
                  {item.isBorrowed ? 'Borrowed' : 'Borrow Now'}
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ItemList;
