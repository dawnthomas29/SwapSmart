import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Paper,
  Grid,
  Divider,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import dayjs from 'dayjs';

const ItemDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const item = state?.item;

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  if (!item) {
    return (
      <Container>
        <Typography variant="h6" color="error" sx={{ mt: 5 }}>
          Item not found.
        </Typography>
      </Container>
    );
  }

  const calculateAmount = () => {
    if (!fromDate || !toDate) return 0;
    const start = dayjs(fromDate);
    const end = dayjs(toDate);
    if (end.isBefore(start)) return 0;
    const days = end.diff(start, 'day') + 1;
    const pricePerDay = item.price / 7;
    return Math.ceil(pricePerDay * days);
  };

  const handleBorrow = () => {
    if (!fromDate || !toDate) {
      alert('Please select both from and to dates.');
      return;
    }
    if (!termsChecked) {
      alert('Please accept the terms and conditions.');
      return;
    }
    navigate('/summary', { state: { item, fromDate, toDate } });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: `Check out this item: ${item.name}`,
        url: window.location.href,
      });
    } else {
      alert('Sharing is not supported in this browser.');
    }
  };

  const toggleFavorite = () => setIsFavorited((prev) => !prev);
  const amount = calculateAmount();

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', mt: 10, py: 5, pb: 12 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} justifyContent="space-between" alignItems="flex-start">
         
          <Grid item xs={12} md={6}>
            <Box sx={{ backgroundColor: '#f5f5f5' }}>
              <Paper
                elevation={0}
                sx={{
                  width: 550,
                  height: 400,
                  borderRadius: 0,
                  border: '15px solid white',
                  overflow: 'hidden',
                  position: 'relative',
                  mx: 'auto',
                }}
              >
                <Box
                  sx={{
                    width: 550,
                    height: 400,
                    backgroundColor: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>

                <Box
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                  }}
                >
                  <IconButton
                    onClick={handleShare}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.8)',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
                      boxShadow: 1,
                    }}
                  >
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                    onClick={toggleFavorite}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.8)',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
                      boxShadow: 1,
                    }}
                  >
                    {isFavorited ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Box>
              </Paper>

              <Paper
                elevation={1}
                sx={{
                  mt: -2,
                  px: 3,
                  py: 2,
                  width: 550,
                  mx: 'auto',
                  backgroundColor: 'white',
                  minHeight: 150,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {item.description}
                </Typography>
              </Paper>
            </Box>
          </Grid>

   
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 1, borderRadius: 1, mt: 2, pt: 5, pl: 5 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                ₹{item.price}/week
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lend for: ₹{item.price}/week • ₹{item.price * 4}/month
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  p: 0.5, 
                  backgroundColor: '#fff',
                  borderRadius: 2,
                  boxShadow: 1,
                  mb: 4,
                
                }}
              >
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Choose date
                </Typography>
                <Grid container spacing={1}> 
                  <Grid item xs={6}>
                    <TextField
                      type="date"
                      fullWidth
                      label="From"
                      InputLabelProps={{ shrink: true }}
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      sx={{ width: '100%' }} 
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="date"
                      fullWidth
                      label="To"
                      InputLabelProps={{ shrink: true }}
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      sx={{ width: '100%' }} 
                    />
                  </Grid>
                </Grid>

                {/* Terms and Conditions */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={termsChecked}
                      onChange={() => setTermsChecked((prev) => !prev)}
                      color="primary"
                    />
                  }
                  label="I agree to the terms and conditions for product safety"
                />

<Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
  <Button
    variant="contained"
    color="primary"
    onClick={handleBorrow}
    disabled={item.isBorrowed || amount === 0 || !termsChecked}
    sx={{ py: 1, mt: 2, fontSize: '1rem', width: '50%' }} 
  >
    ₹{amount}
  </Button>
</Box>

              </Box>
            </Paper>

            {/* Seller Information */}
            <Paper elevation={3} sx={{ p: 3, mt: 5, borderRadius: 1, ml: 0.2 }}>
              <Box display="flex" alignItems="center" gap={2}>
             
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: 30,
                    color: 'white',
                    boxShadow: 3,
                  }}
                >
                  {item.student?.charAt(0).toUpperCase() || 'U'}
                </Box>

              
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    <b>{item.student}</b>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    component="a"
                    href={`tel:${item.contact}`}
                    sx={{ textDecoration: 'none', fontWeight: 500 }}
                  >
                    📞 {item.contact}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ItemDetail;
