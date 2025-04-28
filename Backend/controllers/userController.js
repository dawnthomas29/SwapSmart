const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    if (!name || !phone || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    // Save user to DB
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || 'binoy19#sherly17#ansu13#dona10#don29', {
      expiresIn: '1h',
    });

    res.status(201).json({
      message: 'User registered successfully!',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
      token,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Error registering user.', error: error.message });
  }
};

// LOGIN USER
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'binoy19#sherly17#ansu13#dona10#don29', {
      expiresIn: '1h',
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Something went wrong.', error: error.message });
  }
};

// GET USER PROFILE
exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('-password'); // Exclude password from profile

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Fetch profile error:', error);
    res.status(500).json({ message: 'Error fetching user profile.', error: error.message });
  }
};

// FETCH ALL USERS
exports.fetchUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users);      // Send back users in the response
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users.' });
  }
};

// UPDATE USER PROFILE
exports.updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, phone, email, avatar } = req.body;

    // Ensure at least one field is provided to update
    if (!name && !phone && !email && !avatar) {
      return res.status(400).json({ message: 'No data provided to update.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, phone, email, avatar },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'Profile updated successfully.', user: updatedUser });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Error updating user profile.', error: error.message });
  }
};

// BLOCK USER FUNCTION
exports.blockUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user to block
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // If the user is already blocked, send a message
    if (user.isBlocked) {
      return res.status(400).json({ message: 'User is already blocked.' });
    }

    // Block the user by setting isBlocked to true
    user.isBlocked = true;
    await user.save();

    res.status(200).json({
      message: 'User has been blocked successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isBlocked: user.isBlocked
      }
    });
  } catch (error) {
    console.error('Block user error:', error);
    res.status(500).json({ message: 'Error blocking user', error: error.message });
  }
};

// UNBLOCK USER FUNCTION
exports.unblockUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user to unblock
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // If the user is not blocked, send a message
    if (!user.isBlocked) {
      return res.status(400).json({ message: 'User is not blocked.' });
    }

    // Unblock the user by setting isBlocked to false
    user.isBlocked = false;
    await user.save();

    res.status(200).json({
      message: 'User has been unblocked successfully.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isBlocked: user.isBlocked,
      },
    });
  } catch (error) {
    console.error('Unblock user error:', error);
    res.status(500).json({ message: 'Error unblocking user.', error: error.message });
  }
};

// GET ADMIN DATA FUNCTION
exports.getAdminData = async (req, res) => {
  try {

    const admin = await User.findOne({ name:'admin' });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({
      name: admin.name,
      email: admin.email,
      phone: admin.phone,  // You can include more fields as needed
    });
  } catch (error) {
    console.error('Error fetching admin data:', error.message);  // Log the error message
    res.status(500).json({ message: 'Error fetching admin data', error: error.message });
  }
};
