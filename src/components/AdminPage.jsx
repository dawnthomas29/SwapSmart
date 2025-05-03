import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Snackbar, Alert, Paper } from '@mui/material';
import axios from 'axios';
import { BsJustify, BsSearch, BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsFillGrid3X3GapFill, BsCart3, BsPeopleFill } from 'react-icons/bs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [adminData, setAdminData] = useState(null);
  const [products, setProducts] = useState([]);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [activeSection, setActiveSection] = useState('users');
  const [complaints, setComplaints] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [productStats, setProductStats] = useState([]);

  useEffect(() => {
    if (activeSection === 'users') fetchUsers();
    else if (activeSection === 'dashboard') fetchAdminData();
    else if (activeSection === 'alerts') fetchComplaints();
    else if (activeSection === 'products') fetchProducts();
    else if (activeSection === 'stats') fetchStats();
  }, [activeSection]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      setSnackbar({ open: true, message: 'Error fetching users', severity: 'error' });
    }
  };

  const fetchAdminData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/admin');
      setAdminData(response.data);
    } catch (error) {
      setSnackbar({ open: true, message: 'Error fetching admin data', severity: 'error' });
    }
  };

  const fetchComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/complaints');
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/stats');
      setUserStats(response.data.userStats);
      setProductStats(response.data.productStats);
    } catch (error) {
      setSnackbar({ open: true, message: 'Error fetching stats', severity: 'error' });
    }
  };

  const handleBlockUser = async (userId) => {
    try {
      await axios.patch(`http://localhost:5000/api/users/block/${userId}`);
      setSnackbar({ open: true, message: 'User has been blocked', severity: 'success' });
      fetchUsers();
    } catch (error) {
      setSnackbar({ open: true, message: 'Error blocking user', severity: 'error' });
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      await axios.patch(`http://localhost:5000/api/users/unblock/${userId}`);
      setSnackbar({ open: true, message: 'User has been unblocked', severity: 'success' });
      fetchUsers();
    } catch (error) {
      setSnackbar({ open: true, message: 'Error unblocking user', severity: 'error' });
    }
  };

  const handleDeleteComplaint = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/complaints/${id}`);
      setSnackbar({ open: true, message: 'Complaint deleted successfully!', severity: 'success' });
      fetchComplaints();
    } catch (error) {
      setSnackbar({ open: true, message: 'Error deleting complaint', severity: 'error' });
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setSnackbar({ open: true, message: 'Product deleted successfully!', severity: 'success' });
      fetchProducts();
    } catch (error) {
      setSnackbar({ open: true, message: 'Error deleting product', severity: 'error' });
    }
  };
  
  const toggleSidebar = () => setOpenSidebarToggle(!openSidebarToggle);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gridTemplateRows: '60px auto', gridTemplateAreas: `'header header' 'sidebar main'`, height: '100vh' }}>
      
      {/* Header */}
      <header style={{ gridArea: 'header', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: 1000 }}>
        <div onClick={toggleSidebar}><BsJustify size={24} /></div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <BsSearch />
          <BsFillBellFill />
          <BsFillEnvelopeFill />
          <BsPersonCircle />
        </div>
      </header>

      {/* Sidebar */}
      <aside style={{ gridArea: 'sidebar', backgroundColor: '#2c3e50', color: 'white', paddingTop: 20 }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ padding: '10px 20px' }}><a href="#" onClick={() => setActiveSection('dashboard')} style={{ color: 'white', textDecoration: 'none' }}><BsFillGrid3X3GapFill /> Dashboard</a></li>
          <li style={{ padding: '10px 20px' }}><a href="#" onClick={() => setActiveSection('users')} style={{ color: 'white', textDecoration: 'none' }}><BsPeopleFill /> Users</a></li>
          <li style={{ padding: '10px 20px' }}><a href="#" onClick={() => setActiveSection('alerts')} style={{ color: 'white', textDecoration: 'none' }}><BsFillBellFill /> Complaints</a></li>
          <li style={{ padding: '10px 20px' }}><a href="#" onClick={() => setActiveSection('products')} style={{ color: 'white', textDecoration: 'none' }}><BsCart3 /> Products</a></li>
          <li style={{ padding: '10px 20px' }}><a href="#" onClick={() => setActiveSection('stats')} style={{ color: 'white', textDecoration: 'none' }}><BsFillGrid3X3GapFill /> Stats</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main style={{ gridArea: 'main', padding: '20px', overflowY: 'auto' }}>
        {activeSection === 'users' && (
          <>
            <h3>User Management</h3>
            <TableContainer component={Paper} style={{ backgroundColor: 'white', borderRadius: 8, boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginTop: 16 }}>
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
                          <Button variant="contained" color="primary" onClick={() => handleUnblockUser(user._id)}>Unblock</Button>
                        ) : (
                          <Button variant="contained" color="secondary" onClick={() => handleBlockUser(user._id)}>Block</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {activeSection === 'dashboard' && (
          <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginBottom: '20px' }}>Welcome to the Admin Dashboard</h2>
            {adminData ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ flex: '1', minWidth: '250px', backgroundColor: '#ffffff', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                  <h4 style={{ marginBottom: '10px', color: '#2c3e50' }}>👤 Admin Name</h4>
                  <p style={{ fontSize: '16px' }}>{adminData.name}</p>
                </div>
                <div style={{ flex: '1', minWidth: '250px', backgroundColor: '#ffffff', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                  <h4 style={{ marginBottom: '10px', color: '#2c3e50' }}>📧 Email</h4>
                  <p style={{ fontSize: '16px' }}>{adminData.email}</p>
                </div>
                <div style={{ flex: '1', minWidth: '250px', backgroundColor: '#ffffff', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                  <h4 style={{ marginBottom: '10px', color: '#2c3e50' }}>📞 Phone</h4>
                  <p style={{ fontSize: '16px' }}>{adminData.phone}</p>

                </div>
           
              </div>
            ) : (
              <p style={{ fontStyle: 'italic' }}>Loading admin data...</p>
            )}
          </div>
        )}

        {activeSection === 'stats' && (
          <div>
            <h3>Statistics</h3>
            {/* User Stats */}
            <div style={{ width: '100%', height: '300px', marginTop: '20px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Product Stats */}
            <div style={{ width: '100%', height: '300px', marginTop: '20px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={productStats} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="80%" fill="#8884d8" label>
                    {productStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#82ca9d' : '#8884d8'} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Complaints */}
        {activeSection === 'alerts' && (
          <>
            <h3>User Complaints</h3>
            <TableContainer component={Paper} style={{ marginTop: 16 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {complaints.map((c) => (
                    <TableRow key={c._id}>
                      <TableCell>{c.name}</TableCell>
                      <TableCell>{c.email}</TableCell>
                      <TableCell>{c.message}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="error" onClick={() => handleDeleteComplaint(c._id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {/* Products */}
        {activeSection === 'products' && (
          <>
            <h3>Products</h3>
            <TableContainer component={Paper} style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: '20%', fontWeight: 'bold', textAlign: 'center', padding: '12px' }}><strong>Product</strong></TableCell>
                    <TableCell style={{ width: '20%', fontWeight: 'bold', textAlign: 'center', padding: '12px' }}><strong>Image</strong></TableCell>
                    <TableCell style={{ width: '20%', fontWeight: 'bold', textAlign: 'center', padding: '12px' }}><strong>Description</strong></TableCell>
                    <TableCell style={{ width: '20%', fontWeight: 'bold', textAlign: 'center', padding: '12px' }}><strong>Rate</strong></TableCell>
                    <TableCell style={{ width: '20%', fontWeight: 'bold', textAlign: 'center', padding: '12px' }}><strong>Action</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product._id} style={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                      <TableCell style={{ textAlign: 'center', padding: '12px' }}>{product.name}</TableCell>
                      <TableCell style={{ textAlign: 'center', padding: '12px' }}>
                        <img src={product.image} alt={product.name} style={{ width: '100px', height: 'auto', borderRadius: '8px' }} />
                      </TableCell>
                      <TableCell style={{ textAlign: 'center', padding: '12px', wordWrap: 'break-word', maxWidth: '300px' }}>
                        {product.description}
                      </TableCell>
                      <TableCell style={{ textAlign: 'center', padding: '12px' }}>{product.rate}</TableCell>
                      <TableCell style={{ textAlign: 'center', padding: '12px' }}>
                        <Button variant="contained" color="secondary" onClick={() => handleDeleteProduct(product._id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {/* Snackbar */}
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </main>
    </div>
  );
};

export default AdminPage;
