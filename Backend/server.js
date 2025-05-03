import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDBs } from './config/db.js';

import complaintRoutes from './routes/complaintRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js'; 
import feedbackRoutes from './routes/feedbackRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
app.use(cors());

connectDBs()
  .then(() => {
    // Routes
    app.use('/api/complaints', complaintRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/product', productRoutes);
    app.use('/api/feedback', feedbackRoutes); // Feedback route

    app.get('/', (req, res) => {
      res.send('API is running...');
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error starting the server:', error);
    process.exit(1);
  });
