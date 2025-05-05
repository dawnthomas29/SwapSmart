const mongoose = require('mongoose');
const { connections } = require('../config/db');

const ComplaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Export a function to get the model **after** DBs are connected
module.exports = () => {
  if (!connections.complaint) {
    throw new Error('Complaint DB connection not initialized yet.');
  }
  return connections.complaint.model('Complaint', ComplaintSchema);
};
