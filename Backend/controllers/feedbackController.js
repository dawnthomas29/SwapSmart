const { getFeedbackModel } = require('../models/FeedBack');

exports.addFeedback = async (req, res) => {
  const { name, feedback } = req.body;
  console.log("Received feedback:", req.body);

  if (!name || !feedback) {
    return res.status(400).json({ error: 'Name and feedback are required' });
  }

  try {
    const Feedback = getFeedbackModel();
    const newFeedback = new Feedback({ name, feedback });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save feedback' });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const Feedback = getFeedbackModel();
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    console.error('Error fetching feedback:', err);
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
};
