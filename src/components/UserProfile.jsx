import React, { useEffect, useState } from 'react';
import {
  Container, Box, Typography, Avatar, Button, Card, CardContent, CardMedia, Grid,
  IconButton, Divider, Snackbar, Modal, Backdrop, Fade, TextField
} from '@mui/material';
import {
  Edit as EditIcon, Add as AddIcon, Visibility as VisibilityIcon,
  ArrowForward, ArrowBack, Logout as LogoutIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [uploadedItems, setUploadedItems] = useState([]);
  const [borrowedItems, setBorrowedItems] = useState([]);
  const [view, setView] = useState('uploaded');
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updatedItem, setUpdatedItem] = useState(null);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !token) return;

    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/users/profile/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.user);
        setUpdatedProfile(res.data.user);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchUploadedItems = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/user/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUploadedItems(res.data.products);
      } catch (err) {
        console.error('Error fetching uploaded products:', err);
      }
    };

    const fetchBorrowedItems = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/borrowed/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBorrowedItems(res.data.products);
      } catch (err) {
        console.error('Error fetching borrowed products:', err);
      }
    };

    fetchUserProfile();
    fetchUploadedItems();
    fetchBorrowedItems();
  }, [user?.id, token]);

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleViewButtonClick = (item, index) => {
    setSelectedItem(item);
    setCurrentIndex(index);
    setOpenModal(true);
  };

  const handleNextProduct = () => {
    if (currentIndex < uploadedItems.length - 1) {
      setSelectedItem(uploadedItems[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePreviousProduct = () => {
    if (currentIndex > 0) {
      setSelectedItem(uploadedItems[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCloseItemDetails = () => {
    setSelectedItem(null);
    setOpenModal(false);
  };

  const handleRemoveItem = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${selectedItem._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbarMessage('Item removed successfully');
      setOpenSnackbar(true);
      setUploadedItems(uploadedItems.filter(item => item._id !== selectedItem._id));
      setOpenModal(false);
    } catch (err) {
      setSnackbarMessage('Error removing item');
      setOpenSnackbar(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleUpdateProfile = (updatedData) => {
    axios.put(`http://localhost:5000/api/users/profile/${user.id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setProfile(response.data.user);
      setUpdatedProfile(response.data.user);
      setOpenProfileModal(false);
      setSnackbarMessage('Profile updated successfully');
      setOpenSnackbar(true);
    }).catch(() => {
      setSnackbarMessage('Error updating profile');
      setOpenSnackbar(true);
    });
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateItemChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateItem = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/products/${updatedItem._id}`, updatedItem, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbarMessage('Item updated successfully');
      setOpenSnackbar(true);
      setUploadedItems(prev =>
        prev.map(item => item._id === updatedItem._id ? res.data: item)
      );
      setOpenUpdateModal(false);
      setSelectedItem(res.data.product);
    } catch (err) {
      setSnackbarMessage('Error updating item');
      setOpenSnackbar(true);
    }
  };

  if (!profile) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 6, pt: 8 }}>
      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" mb={6}>
        <Box display="flex" alignItems="center">
          <Avatar
            src={profile.avatar}
            sx={{ width: 100, height: 100, mr: 2, border: '3px solid #1976d2', boxShadow: 3, cursor: 'pointer' }}
          />
          <Box>
            <Typography variant="h5" sx={{ fontSize: { xs: '1.4rem', sm: '2rem' } }} gutterBottom>{profile.name}</Typography>
            <Typography variant="body1" color="textSecondary">{profile.email}</Typography>
            <Typography variant="body1" color="textSecondary">{profile.phone}</Typography>
          </Box>
        </Box>
        <Box mt={{ xs: 2, sm: 0 }}>
          <Button startIcon={<EditIcon />} variant="contained" sx={{ textTransform: 'none', mr: 1 }} onClick={() => setOpenProfileModal(true)}>Update Profile</Button>
          <Button startIcon={<LogoutIcon />} variant="contained" color="error" sx={{ textTransform: 'none' }} onClick={handleLogout}>Logout</Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button variant={view === 'uploaded' ? 'contained' : 'outlined'} onClick={() => setView('uploaded')} sx={{ textTransform: 'none', borderRadius: 2, mx: 1 }}>My Products</Button>
        <Button variant={view === 'borrowed' ? 'contained' : 'outlined'} onClick={() => setView('borrowed')} sx={{ textTransform: 'none', borderRadius: 2, mx: 1 }}>Borrowed Products</Button>
      </Box>

      {view === 'borrowed' && (
        <>
          <Typography variant="h5" gutterBottom>Borrowed Products</Typography>
          <Grid container spacing={3}>
          {borrowedItems.map((item) => {
  // Calculate total price
  const fromDate = new Date(item.createdAt);
  const toDate = new Date(item.dueDate);
  const days = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;
  const pricePerDay = item.price / 7;
  const totalPrice = Math.ceil(pricePerDay * days);

  return (
    <Grid item xs={12} sm={6} md={4} key={item._id}>
      <Card sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' }, p: 2 }}>
        <CardMedia component="img" height="140" image={item.image} alt={item.name} />
        <CardContent>
          <Typography variant="h6" fontWeight="bold">{item.name}</Typography>

          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            <b>Owner:</b> {item.student}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <b>Owner Contact:</b> {item.contact}
          </Typography>

          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            <b>Borrower Name:</b> {profile.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <b>Borrower Contact:</b> {profile.phone}
          </Typography>

          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            <b>Due Date:</b> {new Date(item.dueDate).toLocaleDateString()}
          </Typography>

          <Typography variant="body2" color="textSecondary">
            <b>Total Price:</b> ₹{totalPrice}
          </Typography>

          <Button variant="contained" color="error" sx={{ mt: 2 }}
            onClick={async () => {
              try {
                const res = await fetch(`http://localhost:5000/api/products/cancelBorrow/${item._id}`, {
                  method: 'POST'
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message);
                alert('Item marked as returned & now available');
                window.location.reload(); // Refresh page
              } catch (err) {
                alert(err.message);
              }
            }}
          >
            Cancel Lending
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
})}

          </Grid>
        </>
      )}

      {view === 'uploaded' && (
        <>
          <Typography variant="h5" gutterBottom>My Products</Typography>
          <Grid container spacing={3}>
            {uploadedItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                  <CardMedia component="img" height="140" image={item.image} alt={item.name} />
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Button variant="outlined" startIcon={<VisibilityIcon />} sx={{ mt: 1, fontSize: '0.75rem' }} onClick={() => handleViewButtonClick(item, index)}>View</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center" alignItems="center">
              <Button variant="outlined" startIcon={<AddIcon />} onClick={() => navigate('/add')} sx={{ textTransform: 'none', borderRadius: 2 }}>Add New Item</Button>
            </Grid>
          </Grid>
        </>
      )}

      <Modal open={openModal} onClose={handleCloseItemDetails} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={openModal}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '80%', maxWidth: 600 }}>
            {selectedItem && (
              <>
                <Typography variant="h4" gutterBottom><b>{selectedItem.name}</b></Typography>
                <CardMedia component="img" height="300" image={selectedItem.image} alt={selectedItem.name} sx={{ objectFit: 'contain', width: '100%' }} />
                <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}><b>Description: {selectedItem.description}</b></Typography>
                <Typography variant="body2" color="textSecondary"><b>Category: {selectedItem.category}</b></Typography>
                <Typography variant="body2" color="textSecondary"><b>Contact: {selectedItem.contact}</b></Typography>
                <Typography variant="body2" color="textSecondary"><b>Price: ₹{selectedItem.price}/week</b></Typography>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <IconButton onClick={handlePreviousProduct} disabled={currentIndex === 0}><ArrowBack /></IconButton>
                  <IconButton onClick={handleNextProduct} disabled={currentIndex === uploadedItems.length - 1}><ArrowForward /></IconButton>
                </Box>
                <Button variant="contained" color="error" onClick={handleRemoveItem} sx={{ mt: 2, display: 'block', width: 'auto', fontSize: '0.75rem' }}>Remove Item</Button>
                <Button variant="contained" color="primary" onClick={() => { setUpdatedItem(selectedItem); setOpenUpdateModal(true); }} sx={{ mt:-3.85, ml: 40, display: 'block', width: '30', fontSize: '0.75rem' }}>Update Product</Button>
                <Button variant="text" onClick={handleCloseItemDetails} sx={{ mt: 2, display: 'block', width: '100%' }}>Close</Button>
              </>
            )}
          </Box>
        </Fade>
      </Modal>

      <Modal open={openProfileModal} onClose={() => setOpenProfileModal(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={openProfileModal}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '80%', maxWidth: 600 }}>
            <Typography variant="h6" gutterBottom>Edit Profile</Typography>
            <TextField fullWidth label="Name" name="name" value={updatedProfile?.name || ''} onChange={handleProfileChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Email" name="email" value={updatedProfile?.email || ''} onChange={handleProfileChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Phone" name="phone" value={updatedProfile?.phone || ''} onChange={handleProfileChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Avatar URL" name="avatar" value={updatedProfile?.avatar || ''} onChange={handleProfileChange} sx={{ mb: 2 }} />
            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" onClick={() => handleUpdateProfile(updatedProfile)}>Save Changes</Button>
              <Button variant="outlined" onClick={() => setOpenProfileModal(false)}>Cancel</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Modal open={openUpdateModal} onClose={() => setOpenUpdateModal(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={openUpdateModal}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '80%', maxWidth: 600 }}>
            <Typography variant="h6" gutterBottom>Update Product</Typography>
            <TextField fullWidth label="Name" name="name" value={updatedItem?.name || ''} onChange={handleUpdateItemChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Description" name="description" value={updatedItem?.description || ''} onChange={handleUpdateItemChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Category" name="category" value={updatedItem?.category || ''} onChange={handleUpdateItemChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Contact" name="contact" value={updatedItem?.contact || ''} onChange={handleUpdateItemChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Price" name="price" type="number" value={updatedItem?.price || ''} onChange={handleUpdateItemChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Image URL" name="image" value={updatedItem?.image || ''} onChange={handleUpdateItemChange} sx={{ mb: 2 }} />
            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" onClick={handleUpdateItem}>Save Changes</Button>
              <Button variant="outlined" onClick={() => setOpenUpdateModal(false)}>Cancel</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Snackbar open={openSnackbar} onClose={() => setOpenSnackbar(false)} message={snackbarMessage} autoHideDuration={3000} />
    </Container>
  );
};

export default UserProfile;
