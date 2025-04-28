import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { BsJustify, BsSearch, BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsFillGrid3X3GapFill, BsCart3, BsPeopleFill } from 'react-icons/bs';
import './styles.css'; // Import your CSS file

const AdminPage = () => {
  const [users, setUsers] = useState([]); // State to store the list of users
  const [adminData, setAdminData] = useState(null); // State to store admin data
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [activeSection, setActiveSection] = useState('users'); // State to track the active section

  useEffect(() => {
    if (activeSection === 'users') {
      fetchUsers(); // Fetch users only when the "Users" section is active
    } else if (activeSection === 'dashboard') {
      fetchAdminData();
    }
  }, [activeSection]);

  // Fetch users from the backend API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');  // This is your API URL
      setUsers(response.data);  // Set the users data in state
    } catch (error) {
      console.error('Error fetching users:', error);  // Log the error to the console
      setSnackbar({ open: true, message: 'Error fetching users', severity: 'error' });
    }
  };

  // Fetch admin data from the backend API
  const fetchAdminData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/admin'); // ✅ correct endpoint
      setAdminData(response.data);  // Set admin data in state
    } catch (error) {
      console.error('Error fetching admin data:', error);  // Log the error
      setSnackbar({ open: true, message: 'Error fetching admin data', severity: 'error' });
    }
  };

  // Handle blocking a user
  const handleBlockUser = async (userId) => {
    try {
      await axios.patch(`http://localhost:5000/api/users/block/${userId}`);
      setSnackbar({ open: true, message: 'User has been blocked', severity: 'success' });
      fetchUsers(); // Refresh the user list after blocking a user
    } catch (error) {
      setSnackbar({ open: true, message: 'Error blocking user', severity: 'error' });
    }
  };

  // Handle unblocking a user
  const handleUnblockUser = async (userId) => {
    try {
      await axios.patch(`http://localhost:5000/api/users/unblock/${userId}`);
      setSnackbar({ open: true, message: 'User has been unblocked', severity: 'success' });
      fetchUsers(); // Refresh the user list after unblocking a user
    } catch (error) {
      setSnackbar({ open: true, message: 'Error unblocking user', severity: 'error' });
    }
  };

  // Toggle sidebar visibility
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      {/* Header */}
      <header className="header">
        <div className="menu-icon" onClick={OpenSidebar}>
          <BsJustify className="icon" />
        </div>
        <div className="header-icons">
          <BsSearch className="icon" />
          <BsFillBellFill className="icon" />
          <BsFillEnvelopeFill className="icon" />
          <BsPersonCircle className="icon" />
        </div>
      </header>

      {/* Sidebar */}
      <aside className={openSidebarToggle ? 'sidebar sidebar-responsive' : 'sidebar'}>
        <div className="sidebar-title">
          <div className="sidebar-brand">
            <BsCart3 className="icon_header" /> SHOP
          </div>
          <span className="icon close_icon" onClick={OpenSidebar}>X</span>
        </div>
        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <a href="#" onClick={() => setActiveSection('dashboard')}>
              <BsFillGrid3X3GapFill className="icon" /> Dashboard
            </a>
          </li>
          <li className="sidebar-list-item">
            <a href="#" onClick={() => setActiveSection('users')}>
              <BsPeopleFill className="icon" /> Users
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-container">
        <div className="main-title">
          <h3>{activeSection === 'users' ? 'USER MANAGEMENT' : 'DASHBOARD'}</h3>
        </div>

        {/* Conditionally render content based on active section */}
        {activeSection === 'users' ? (
          <TableContainer className="table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.password}</TableCell>
                    <TableCell>
                      {user.isBlocked ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleUnblockUser(user._id)}
                        >
                          Unblock User
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleBlockUser(user._id)}
                        >
                          Block User
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className="dashboard-content">
            <h4>Welcome to the Dashboard</h4>
            {adminData ? (
              <div>
                <h5>Admin Info:</h5>
                <p><strong>Name:</strong> {adminData.name}</p>
                <p><strong>Email:</strong> {adminData.email}</p>
                <p><strong>Phone:</strong> {adminData.phone}</p>
                {/* Add other admin fields if necessary */}
              </div>
            ) : (
              <p>Loading admin data...</p>
            )}
          </div>
        )}
      </main>

      {/* Snackbar for Feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminPage;
