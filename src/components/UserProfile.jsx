import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Divider,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';
import { Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [uploadedItems, setUploadedItems] = useState([]);
  const [borrowedItems, setBorrowedItems] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || !token) return;

    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/profile/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.user);
        setUpdatedProfile(res.data.user);
      } catch (err) {
        console.error('Error fetching profile:', err);
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

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/users/profile/${profile._id}`, updatedProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data.user);
      setOpenEditModal(false);
      alert('Profile updated!');
    } catch (err) {
      console.error('Update error:', err);
      alert('Error updating profile');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  if (!profile) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 6, pt: 10 }}> {/* Increased mt and pt */}
      {/* Profile Header */}
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar src={profile.avatar} sx={{ width: 100, height: 100, mr: 2 }} />
        <Box>
          <Typography variant="h4">{profile.name}</Typography>
          <Typography variant="body1">{profile.email}</Typography>
          <Typography variant="body1">{profile.phone}</Typography>

          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setOpenEditModal(true)}>
              Edit Profile
            </Button>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Borrowed Products Section */}
      <Typography variant="h5" gutterBottom>
        Borrowed Products
      </Typography>
      <Grid container spacing={2}>
        {borrowedItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Borrowed from: {item.ownerName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Due: {new Date(item.dueDate).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Uploaded Products Section */}
      <Typography variant="h5" gutterBottom>
        My Products
      </Typography>
      <Grid container spacing={2}>
        {uploadedItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card>
              <CardMedia component="img" height="140" image={item.image} alt={item.name} />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {/* Placeholder to Add Item */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <CardContent>
              <IconButton color="primary">
                <AddIcon />
              </IconButton>
              <Typography variant="body2" color="textSecondary">
                Add New Item
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Modal for Editing Profile */}
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={openEditModal}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 4, width: 400 }}>
            <Typography variant="h6" gutterBottom>Edit Profile</Typography>
            <TextField fullWidth label="Name" name="name" value={updatedProfile.name || ''} onChange={handleProfileChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Email" name="email" value={updatedProfile.email || ''} onChange={handleProfileChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Phone" name="phone" value={updatedProfile.phone || ''} onChange={handleProfileChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Avatar URL" name="avatar" value={updatedProfile.avatar || ''} onChange={handleProfileChange} sx={{ mb: 2 }} />
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={handleSaveProfile} variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default UserProfile;
