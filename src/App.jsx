import React, { useState, useEffect } from 'react';
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
import AdminPage from './components/AdminPage';
import useScrollRestoration from './components/useScrollRestoration';
import UserProfile from './components/UserProfile';
import AddItem from './components/AddItem';
import Home from './components/Home';
import About from './components/About';
import CategoryPage from './components/CategoryPage';
import SearchResults from './components/SearchResults';
import HowItWorks from './components/HowItWorks'; // ✅ Make sure this file exists

function ScrollManager() {
  useScrollRestoration();
  return null;
}

// ✅ Home page layout
function HomeLayout({ feedbacks, items }) {
  return (
    <>
      <Container maxWidth="lg" sx={{ padding: '20px 0' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Categories items={items} />
          <Logos />
          <Home items={items} />
          <HowItWorks /> {/* ✅ How it works section added here */}
        </Box>
      </Container>
      <FeedbackSection feedbacks={feedbacks} />
      <About />
      <Footer />
    </>
  );
}

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/feedback');
        if (res.ok) {
          const data = await res.json();
          setFeedbacks(data);
        } else {
          console.error('Failed to fetch feedbacks');
        }
      } catch (err) {
        console.error('Error fetching feedbacks:', err);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        if (res.ok) {
          const data = await res.json();
          setItems(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchFeedbacks();
    fetchProducts();
  }, []);

  const handleAddFeedback = (newFeedback) => {
    setFeedbacks((prev) => [newFeedback, ...prev]);
  };

  const handleAddItem = (newItem) => {
    setItems((prev) => [...prev, newItem]);
  };

  return (
    <>
      <CssBaseline />
      <ScrollManager />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeLayout feedbacks={feedbacks} items={items} />} />
        <Route path="/log" element={<Login />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/complaint" element={<ComplaintForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<FeedbackForm onSubmitFeedback={handleAddFeedback} />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/userpage" element={<UserProfile />} />
        <Route path="/add" element={<AddItem onAddItem={handleAddItem} />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/search" element={<SearchResults />} />
        
      </Routes>
    </>
  );
}

export default App;
