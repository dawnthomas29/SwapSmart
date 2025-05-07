const getComplaintModel = require('../models/Complaint');
const nodemailer = require('nodemailer')
// Save a new complaint

exports.createComplaint = async (req, res) => {
  try {
    const Complaint = getComplaintModel();
    const { name, email, message } = req.body;

    // Save to DB
    const newComplaint = new Complaint({ name, email, message });
    await newComplaint.save();

    // Send email to admin
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'benoythomas31@gmail.com',
        pass: 'qdzqkgynbcbubdfi', // use Gmail app password, NOT your actual Gmail password
      },
    });

    const mailOptions = {
      from: email,
      to: 'benoythomas31@gmail.com',
      subject: `New Complaint from ${name}`,
      text: `
You have received a new complaint:

Name: ${name}
Email: ${email}
Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Complaint submitted and emailed successfully!' });
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
