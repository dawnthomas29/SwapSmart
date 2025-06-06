const mongoose = require('mongoose');
const { connections } = require('../config/db');// Adjust path if needed

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  student: { type: String, required: true },
  description: String,
  contact: String,
  category: String,
  image: String,
  price: String,
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },

  isBorrowed: { type: Boolean, default: false },
  borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  dueDate: { type: Date, default: null },
  ownerEmail: { type: String, required: true },
  totalPrice: String,
});

module.exports = () => {
  if (!connections.products) {
    throw new Error('Products DB connection is not established');
  }
  return connections.products.model('Product', productSchema);
};
