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

const categories = ['Electronics', 'Books', 'Clothing', 'Home', 'Sports', 'Stationary'];

const AddItem = ({ onAddItem }) => {
  const [form, setForm] = useState({
    name: '',
    student: '',
    description: '',
    contact: '',
    category: '',
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Item Name is required';
    if (!form.student) newErrors.student = 'Student Name is required';
    if (!form.description) newErrors.description = 'Description is required';
    if (!form.contact) newErrors.contact = 'Contact is required';
    if (!form.category) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAddItem(form);
      setSnackbar({ open: true, message: 'Item Added Successfully!', severity: 'success' });
      setTimeout(() => navigate('/'), 1500);
    } else {
      setSnackbar({ open: true, message: 'Please fill all fields correctly.', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="xs" sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <Box sx={{
        width: '100%',
        maxWidth: '400px',
        padding: '40px',
        boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
        borderRadius: '12px',
        backgroundColor: '#ffffff'
      }}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <AddCircleOutlineIcon sx={{ fontSize: 30, color: '#FF7F50', marginRight: 1 }} />
          <Typography variant="h4" sx={{ color: '#FF7F50', fontWeight: 'bold' }}>
            Add Item
          </Typography>
        </Box>

        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{
            borderColor: '#FF7F50',
            color: '#FF7F50',
            fontWeight: 'bold',
            borderRadius: '30px',
            mb: 2,
            textTransform: 'none',
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
              height: 'auto',
              borderRadius: '12px',
              marginBottom: '20px',
              border: '2px solid #eee',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          />
        )}

        <TextField
          name="name"
          label="Item Name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
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
          margin="normal"
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
          rows={3}
          margin="normal"
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
          margin="normal"
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
          margin="normal"
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

        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          sx={{
            marginTop: '20px',
            padding: '12px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '30px',
            backgroundColor: '#FF7F50',
            '&:hover': {
              backgroundColor: '#FF6347',
            },
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
