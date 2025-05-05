const mongoose = require('mongoose');
const { connections } = require('../config/db'); // Adjust path if needed

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  student: { type: String, required: true },
  description: String,
  contact: String,
  category: String,
  image: String,
  price: String,
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  ownerEmail: { type: String, required: true }, // Store owner's email
  status: { type: String, enum: ['available', 'pending', 'approved', 'declined'], default: 'available' }, // Track approval state
  borrowerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

// Export a function to get the Product model after DB connection is ready
module.exports = () => {
  if (!connections.products) {
    throw new Error('Products DB connection is not established');
  }
  return connections.products.model('Product', productSchema);
};
