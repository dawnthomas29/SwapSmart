const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { connections } = require('../config/db');

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Password match method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Lazy-load model tied to the 'swapSmart' DB connection
let UserModel;

const getUserModel = () => {
  if (!UserModel) {
    const conn = connections?.swapSmart;
    if (!conn || conn.readyState !== 1) {
      throw new Error('SwapSmart DB connection not established.');
    }
    UserModel = conn.model('User', userSchema);
  }
  return UserModel;
};

module.exports = getUserModel;
