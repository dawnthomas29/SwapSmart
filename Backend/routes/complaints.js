const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// Save a new complaint
router.post('/', async (req, res) => {
  try {
    const newComplaint = new Complaint(req.body);
    await newComplaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit complaint' });
  }
});

// Get all complaints (for Admin Page)
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});

// DELETE complaint by ID
router.delete('/:id', async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete complaint' });
  }
});


module.exports = router;
