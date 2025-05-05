const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Store connections for multiple DBs
const connections = {};

// Function to connect to multiple databases
const connectDBs = async () => {
  try {
    // 🔗 Connect to SwapSmart DB
    const swapSmartConn = await mongoose.createConnection(
      'mongodb+srv://donthomasbinoy814:user@cluster0.4eihooz.mongodb.net/SwapSmart?retryWrites=true&w=majority&appName=Cluster0',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,
      }
    );
    connections.swapSmart = swapSmartConn;
    console.log('✅ Connected to SwapSmart DB');

    // 🔗 Connect to Complaint DB
    const complaintConn = await mongoose.createConnection(
      'mongodb+srv://swapsmart5:swapsmart5@cluster0.kyg8oyq.mongodb.net/complaintDB?retryWrites=true&w=majority&appName=Cluster0',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,
      }
    );
    connections.complaint = complaintConn;
    console.log('✅ Connected to Complaint DB');

    // 🔗 Connect to Feedback DB
    const feedbackConn = await mongoose.createConnection(
      'mongodb+srv://anjela:090605anj@cluster0.y9xrmfb.mongodb.net/feedback?retryWrites=true&w=majority&appName=Cluster0',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,
      }
    );
    connections.feedback = feedbackConn;
    console.log('✅ Connected to Feedback DB');

    // 🔗 Connect to SwapSmartDB (Products)
    const productsConn = await mongoose.createConnection(
      'mongodb+srv://ashithachacko:ashitha2003@cluster0.drbldjy.mongodb.net/SwapSmartDB?retryWrites=true&w=majority&appName=Cluster0',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,
      }
    );
    connections.products = productsConn;
    console.log('✅ Connected to SwapSmartDB (Products)');
    
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if any DB fails
  }
};

module.exports = { connectDBs, connections };
