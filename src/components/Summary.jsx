import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Button
} from '@mui/material';
import dayjs from 'dayjs';

const Summary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { item, fromDate, toDate } = state || {};

  if (!item || !fromDate || !toDate) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h6" color="error">
          Missing item or date data.
        </Typography>
      </Container>
    );
  }

  const start = dayjs(fromDate);
  const end = dayjs(toDate);
  const days = end.diff(start, 'day') + 1; // Include both start and end dates
  const pricePerDay = item.price / 7;
  const totalPrice = Math.ceil(pricePerDay * days);

  const handleConfirm = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await fetch(`http://localhost:5000/api/products/borrow/${item._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.id,
          fromDate,
          toDate
        })
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
  
      alert('Borrow confirmed!\n\nAn email would be sent to:\n• Provider\n• Borrower');
      navigate('/');
      window.location.reload(); // ✅ Force refresh item status
    } catch (err) {
      alert(err.message);
    }
  };
  

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Container sx={{ mt: 20 }}>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Borrow Summary</Typography>

        <Card sx={{ display: 'flex', gap: 4, p: 3, mt: 3 }}>
          <CardMedia
            component="img"
            image={item.image}
            alt={item.name}
            sx={{ width: 300, height: 300, objectFit: 'contain' }}
          />
          <CardContent>
            <Typography variant="h5">{item.name}</Typography>
            <Typography>
              <strong>Rate:</strong> ₹{item.price} / week
            </Typography>
            <Typography>
              <strong>From:</strong> {fromDate}
            </Typography>
            <Typography>
              <strong>To:</strong> {toDate}
            </Typography>
            <Typography>
              <strong>Total Days:</strong> {days}
            </Typography>
            <Typography sx={{ my: 2 }}>
              <strong>Total:</strong> ₹{totalPrice}
            </Typography>

            {/* Contact link */}
            <Typography sx={{ mb: 2 }}>
              <strong>Contact:</strong>{' '}
              <a href={`tel:${item.contact}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                {item.contact}
              </a>
            </Typography>

            <Box mt={3} display="flex" gap={2}>
              <Button variant="contained" color="success" onClick={handleConfirm}>
                Confirm
              </Button>
              <Button variant="outlined" color="error" onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Summary;
