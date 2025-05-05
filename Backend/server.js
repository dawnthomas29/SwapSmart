const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Import DB connection
const { connectDBs } = require('./config/db');

// Import route files
const complaintRoutes = require('./routes/complaintRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes'); // Added feedback route


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to all MongoDB databases
connectDBs()
  .then(() => {
    // API Routes
    app.use('/api/complaints', complaintRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/feedback', feedbackRoutes); // Feedback route
   
    // Root route
    app.get('/', (req, res) => {
      res.send('🚀 API is running...');
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error connecting to databases:', error);
    process.exit(1); // Exit if DB connection fails
  });
