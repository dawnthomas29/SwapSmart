import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = ({ items }) => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  // Ensure items are sorted by creation time (latest first)
  const sortedItems = items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleCardClick = (item) => {
    navigate(`/item/${item._id}`, { state: { item } });
  };

  const toggleView = () => {
    setShowAll((prev) => !prev);
  };

  if (!Array.isArray(sortedItems) || sortedItems.length === 0) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6" color="textSecondary">
          No items available.
        </Typography>
      </Container>
    );
  }

  const itemsToShow = showAll ? sortedItems : sortedItems.slice(0, 4);

  return (
    <Box
      sx={{
        backgroundColor: '#f4f0ec',
        py: 5,
        px: 10,
        mt: 5,
        width: '95.5vw',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          mb: 5,
          fontWeight: 'bold',
          fontSize: '2rem',
          color: '#333',
        }}
      >
        {showAll ? 'All Products' : 'Recently Added'}
      </Typography>

      <Grid container spacing={6}>
        {itemsToShow.map((item) => (
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

      {/* View More Button */}
      {items.length > 4 && !showAll && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={toggleView}
            sx={{
              fontWeight: 'bold',
              borderRadius: 2,
              borderColor: '#1976d2',
              color: '#1976d2',
              '&:hover': {
                backgroundColor: '#e3f2fd',
              },
            }}
          >
            View More
          </Button>
        </Box>
      )}

      {/* View Less Button */}
      {showAll && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={toggleView}
            sx={{
              fontWeight: 'bold',
              borderRadius: 2,
              borderColor: '#1976d2',
              color: '#1976d2',
              '&:hover': {
                backgroundColor: '#e3f2fd',
              },
              mb: 2, // Margin bottom to separate the buttons
            }}
          >
            View Less
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Home;
