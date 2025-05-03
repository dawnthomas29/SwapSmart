// config/db.js
import mongoose from 'mongoose';

const connections = {};

export const connectDBs = async () => {
  try {
    // Connect to SwapSmart DB
    const swapSmartConn = await mongoose.createConnection(
      'mongodb+srv://anjela:090605anj@cluster0.y9xrmfb.mongodb.net/project'
    );
    connections.swapSmart = swapSmartConn;
    console.log('✅ Connected to SwapSmart DB');

    // Connect to Complaint DB
    const complaintConn = await mongoose.createConnection(
      'mongodb+srv://anjela:090605anj@cluster0.y9xrmfb.mongodb.net/test'
    );
    connections.complaint = complaintConn;
    console.log('✅ Connected to Complaint DB');

    // Connect to Feedback DB
    const feedbackConn = await mongoose.createConnection(
      'mongodb+srv://anjela:090605anj@cluster0.y9xrmfb.mongodb.net/feedback'
    );
    connections.feedback = feedbackConn;
    console.log('✅ Connected to Feedback DB');

  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    throw error;
  }
};

export { connections };
