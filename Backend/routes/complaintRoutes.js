// routes/complaintRoutes.js
const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

// Save a new complaint
router.post('/', complaintController.createComplaint);

// Get all complaints (for Admin Page)
router.get('/', complaintController.getComplaints);

// DELETE complaint by ID
router.delete('/:id', complaintController.deleteComplaint);

module.exports = router;
