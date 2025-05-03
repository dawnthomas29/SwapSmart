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
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ items }) => {
  const navigate = useNavigate();

  if (!Array.isArray(items) || items.length === 0) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6" color="textSecondary">
          No items available.
        </Typography>
      </Container>
    );
  }
<br/>
  return (
    <Box
      className="bg-recently"
      sx={{
        backgroundColor: '#f4f0ec ', // ✅ white background applied here
        py: 5,
        px:10,
        paddingY: 10,
        mt:5,
        
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
        Recently Added
      </Typography>

      <Grid container spacing={5}>
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
                ml:-4,
              }}
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
                  }}
                  onClick={() => navigate(`/item/${item._id}`)}
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

export default Home;
