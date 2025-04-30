const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Store connections for multiple DBs
const connections = {};

// Function to connect to multiple databases
const connectDBs = async () => {
  try {
    // Connect to SwapSmart DB
    const swapSmartConn = await mongoose.createConnection(
      'mongodb+srv://donthomasbinoy814:user@cluster0.4eihooz.mongodb.net/SwapSmart?retryWrites=true&w=majority&appName=Cluster0',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    connections.swapSmart = swapSmartConn;
    console.log('Connected to SwapSmart DB');

    // Connect to Complaint DB
    const complaintConn = await mongoose.createConnection(
      'mongodb+srv://swapsmart5:swapsmart5@cluster0.kyg8oyq.mongodb.net/complaintDB?retryWrites=true&w=majority&appName=Cluster0',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    connections.complaint = complaintConn;
    console.log('Connected to Complaint DB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

// Explicitly export the connectDBs function and connections
module.exports = { connectDBs, connections };
