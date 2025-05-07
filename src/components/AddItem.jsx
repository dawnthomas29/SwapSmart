import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import imageCompression from 'browser-image-compression';

const categories = ['Electronics', 'Books', 'Clothing', 'Home', 'Sports', 'Stationary'];

const AddItem = ({ onAddItem }) => {
  const [form, setForm] = useState({
    name: '',
    student: '',
    description: '',
    contact: '',
    category: '',
    image: '',
    price: '',
    email: '',  // Added email state
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const base64 = await imageCompression.getDataUrlFromFile(compressedFile);
        setForm({ ...form, image: base64 });
      } catch (error) {
        console.error('Image compression error:', error);
        setSnackbar({ open: true, message: 'Image compression failed.', severity: 'error' });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[a-z]+\.\d{2}[a-z]{3}\d{3}@mariancollege\.org$/i; // Regex for the given email format

    if (!form.name) newErrors.name = 'Item Name is required';
    if (!form.student) newErrors.student = 'Student Name is required';
    if (!form.description) newErrors.description = 'Description is required';
    if (!form.contact) newErrors.contact = 'Contact is required';
    if (!form.category) newErrors.category = 'Category is required';
    if (!form.price) newErrors.price = 'Price is required';
    
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(form.email) && form.email !== 'admin@mariancollege.org') {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const user = JSON.parse(localStorage.getItem('user'));
      try {
        const response = await axios.post('http://localhost:5000/api/products', {
          ...form,
          userId: user?.id,
        });
        if (onAddItem) onAddItem(response.data);
        setSnackbar({ open: true, message: 'Item Added Successfully!', severity: 'success' });
        setTimeout(() => navigate('/userpage'), 1500);
      } catch (error) {
        console.error('Error submitting item:', error);
        setSnackbar({ open: true, message: 'Failed to add item.', severity: 'error' });
      }
    } else {
      setSnackbar({ open: true, message: 'Please fill all fields correctly.', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: '4cm', paddingBottom: '32px' }}>
      <Box
        sx={{
          width: '100%',
          padding: 3,
          boxShadow: 2,
          borderRadius: 2,
          backgroundColor: '#fff'
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <AddCircleOutlineIcon sx={{ fontSize: 24, color: '#00b8a8', mr: 1 }} />
          <Typography variant="h5" sx={{ color: '#00b8a8', fontWeight: 'bold' }}>
            Add Item
          </Typography>
        </Box>

        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{
            fontSize: '0.85rem',
            borderRadius: '20px',
            mb: 1.5,
            borderColor: '#00b8a8',
            color: '#00b8a8',
            '&:hover': { borderColor: '#FF6347', color: '#FF6347' }
          }}
        >
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </Button>

        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            style={{
              width: '100%',
              maxHeight: '180px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '16px',
              border: '1px solid #eee',
            }}
          />
        )}

        <TextField
          name="name"
          label="Item Name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          size="small"
          margin="dense"
          variant="outlined"
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          name="student"
          label="Student Name"
          value={form.student}
          onChange={handleChange}
          fullWidth
          size="small"
          margin="dense"
          variant="outlined"
          error={!!errors.student}
          helperText={errors.student}
        />
        <TextField
          name="description"
          label="Description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={2}
          size="small"
          margin="dense"
          variant="outlined"
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField
          name="contact"
          label="Contact"
          value={form.contact}
          onChange={handleChange}
          fullWidth
          size="small"
          margin="dense"
          variant="outlined"
          error={!!errors.contact}
          helperText={errors.contact}
        />
        <TextField
          name="category"
          select
          label="Category"
          value={form.category}
          onChange={handleChange}
          fullWidth
          size="small"
          margin="dense"
          variant="outlined"
          error={!!errors.category}
          helperText={errors.category}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          name="price"
          label="Price (₹)"
          type="number"
          value={form.price}
          onChange={handleChange}
          fullWidth
          size="small"
          margin="dense"
          variant="outlined"
          error={!!errors.price}
          helperText={errors.price}
        />

        <TextField
          name="email"
          label="Email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          size="small"
          margin="dense"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          sx={{
            mt: 2,
            py: 1.2,
            fontSize: '0.95rem',
            fontWeight: 'bold',
            borderRadius: '25px',
            backgroundColor: '#00b8a8',
            '&:hover': { backgroundColor: '#FF6347' },
          }}
        >
          Submit
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddItem;
