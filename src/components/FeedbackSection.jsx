// components/FeedbackSection.js

import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';

const FeedbackSection = ({ feedbacks }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleFeedbacks = showAll ? feedbacks : feedbacks.slice(0, 5);

  return (
    <Box sx={{ px: 3, py: 4, backgroundColor: '#f9f9f9' }}>
      <Typography variant="h5" sx={{ mb: 2, color: 'coral' }}>
        What Our Users Say
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {visibleFeedbacks.map((fb, index) => (
          <Card key={index} sx={{ minWidth: 250, maxWidth: 300, flex: '1 1 auto', boxShadow: 3 }}>
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

      {feedbacks.length > 5 && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            onClick={() => setShowAll(!showAll)}
            sx={{
              backgroundColor: 'coral',
              color: 'white',
              px: 4,
              '&:hover': { backgroundColor: '#e6735b' },
            }}
          >
            {showAll ? 'Show Less' : 'View More'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FeedbackSection;
