// App.js

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, Container, Box } from '@mui/material';

import NavBar from './components/NavBar';
import Categories from './components/Categories';
import FeedbackForm from './components/FeedbackForm';
import FeedbackSection from './components/FeedbackSection'; // <- ADD THIS
import Footer from './components/Footer';
import Logos from './components/Logos';
import Login from './components/Login';
import Register from './components/Register';
import ComplaintForm from './components/ComplaintForm';
import Contact from './components/Contact';

function HomeLayout({ feedbacks }) {
  return (
    <>
      <Container maxWidth="lg" sx={{ padding: '20px 0' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Categories />
          <Logos />
        </Box>
      </Container>
      <FeedbackSection feedbacks={feedbacks} /> {/* Show feedbacks here */}
      <Footer />
    </>
  );
}

function App() {
  const [feedbacks, setFeedbacks] = useState([]);

  const handleAddFeedback = (newFeedback) => {
    setFeedbacks((prev) => [newFeedback, ...prev]);
  };

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeLayout feedbacks={feedbacks} />} />
        <Route path="/log" element={<Login />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/complaint" element={<ComplaintForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<FeedbackForm onSubmitFeedback={handleAddFeedback} />} />
      </Routes>
    </>
  );
}

export default App;
