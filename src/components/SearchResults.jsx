import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import axios from 'axios';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q');
  const [results, setResults] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (query) {
      axios.get(`http://localhost:5000/api/products/search?name=${query}`)
        .then(res => {
          if (res.data.length > 0) {
            setResults(res.data);
            setNotFound(false);
          } else {
            setResults([]);
            setNotFound(true);
          }
        })
        .catch(() => {
          setResults([]);
          setNotFound(true);
        });
    }
  }, [query]);

  const handleResultClick = (item) => {
    navigate(`/item/${item._id}`, { state: { item } });
  };

  return (
    <Box sx={{ padding: 2 }}>
  <Typography variant="h4">Search Results for "{query}"</Typography>

  {results.length > 0 ? (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 4,
      }}
    >
      {results.map(item => (
        <Box
          key={item._id}
          sx={{
            width: '250px',
            border: '1px solid #ccc',
            padding: 2,
            borderRadius: 2,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 1,
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.03)',
            },
          }}
          onClick={() => handleResultClick(item)}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            {item.name}
          </Typography>
          <Typography variant="body2">{item.description}</Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            ₹ {item.price}
          </Typography>
        </Box>
      ))}
    </Box>
  ) : (
    notFound && <Typography sx={{ color: 'red' }}>Results not Found</Typography>
  )}
</Box>

  );
};

export default SearchResults;