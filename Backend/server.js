const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Import custom DB connection setup
const { connectDBs } = require('./config/db');
const complaintRoutes = require('./routes/complaintRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all origins

// Connect to MongoDB databases
connectDBs()
  .then(() => {
    // Routes
    app.use('/api/complaints', complaintRoutes); // Routes for complaint handling
    app.use('/api/users', userRoutes); // Routes for user management

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to databases:', error);
    process.exit(1); // Exit the process if DB connection fails
  });
