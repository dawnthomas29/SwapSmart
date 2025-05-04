import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import axios from 'axios';

const SearchResults = () => {
  const location = useLocation();
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

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Search Results for "{query}"</Typography>
      {results.length > 0 ? (
        results.map(product => (
          <Box key={product._id} sx={{ border: '1px solid #ccc', padding: 2, marginTop: 2, borderRadius: 2 }}>
            <img src={product.image} alt={product.name} width="150" height="150" />
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body2">{product.description}</Typography>
            <Typography variant="body1">₹ {product.price}</Typography>
          </Box>
        ))
      ) : (
        notFound && <Typography sx={{ color: 'red' }}>Results not Found</Typography>
      )}
    </Box>
  );
};

export default SearchResults;
