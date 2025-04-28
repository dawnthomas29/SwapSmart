import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, Container, Box } from '@mui/material';

import './App.css';
import NavBar from './components/NavBar';
import Categories from './components/Categories';
import FeedbackForm from './components/FeedbackForm';
import FeedbackSection from './components/FeedbackSection';
import Footer from './components/Footer';
import Logos from './components/Logos';
import Login from './components/Login';
import Register from './components/Register';
import ComplaintForm from './components/ComplaintForm';
import Contact from './components/Contact';
import AdminPage from './components/AdminPage'; // ✅ import admin page
import useScrollRestoration from './components/useScrollRestoration'; // ✅ custom scroll hook
import UserProfile from './components/UserProfile';
import AddItem from './components/AddItem';

// Wrap this in a component
function ScrollManager() {
  useScrollRestoration();
  return null;
}

function HomeLayout({ feedbacks }) {
  return (
    <>
      <Container maxWidth="lg" sx={{ padding: '20px 0' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Categories />
          <Logos />
        </Box>
      </Container>
      <FeedbackSection feedbacks={feedbacks} />
      <Footer />
    </>
  );
}

function App() {
  const [feedbacks, setFeedbacks] = useState([]);

  const handleAddFeedback = (newFeedback) => {
    setFeedbacks((prev) => [newFeedback, ...prev]);
  };

   const [items, setItems] = useState([]);

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <>
      <CssBaseline />
      <ScrollManager />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeLayout feedbacks={feedbacks} />} />
        <Route path="/log" element={<Login />} />
        <Route path="/reg" element={<Login />} />
        <Route path="/complaint" element={<ComplaintForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<FeedbackForm onSubmitFeedback={handleAddFeedback} />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/userpage" element={<UserProfile />} />
        <Route path="/add" element={<AddItem onAddItem={handleAddItem} />} />
        <Route path="/" element={<Categories items={items} />} />
      </Routes>
    </>
  );
}

export default App;
