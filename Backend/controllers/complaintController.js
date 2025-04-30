const getComplaintModel = require('../models/Complaint');

// Save a new complaint
exports.createComplaint = async (req, res) => {
  try {
    const Complaint = getComplaintModel();
    const newComplaint = new Complaint(req.body);
    await newComplaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully!' });
  } catch (error) {
    console.error('Error submitting complaint:', error);
    res.status(500).json({ message: 'Failed to submit complaint', error: error.message });
  }
};

// Get all complaints (for Admin Page)
exports.getComplaints = async (req, res) => {
  try {
    const Complaint = getComplaintModel();
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ message: 'Failed to fetch complaints', error: error.message });
  }
};

// DELETE complaint by ID
exports.deleteComplaint = async (req, res) => {
  try {
    const Complaint = getComplaintModel();
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found.' });
    }
    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    console.error('Error deleting complaint:', error);
    res.status(500).json({ message: 'Failed to delete complaint', error: error.message });
  }
};
