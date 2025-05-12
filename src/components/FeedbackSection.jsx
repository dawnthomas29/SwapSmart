import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const FeedbackSection = ({ feedbacks }) => {
  return (
    <Box sx={{ px: 3, py: 6, backgroundColor: '#f4f0ec' }} width="100vw">
      <Typography variant="h5" sx={{ mb: 3, color: '#00b8a8' }} textAlign="center">
        <b>What Our Users Say</b>
      </Typography>

      {/* Horizontal Scrollable Feedback Row */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          flexWrap: 'nowrap',
          gap: 2,
          pb: 2,
          px: 1,
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
            borderRadius: 4,
          },
        }}
      >
        {feedbacks.map((fb, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 250,
              maxWidth: 280,
              flex: '0 0 auto',
              boxShadow: 3,
              scrollSnapAlign: 'start',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                {fb.name}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {fb.feedback}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default FeedbackSection;
