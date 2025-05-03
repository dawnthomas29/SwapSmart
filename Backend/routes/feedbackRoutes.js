import { getFeedbackModel } from '../models/FeedBack.js';
import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, feedback } = req.body;
  console.log("Received feedback:", req.body);


  if (!name || !feedback) {
    return res.status(400).json({ error: 'Name and feedback are required' });
  }

  try {
    const Feedback = getFeedbackModel(); // Get model after DB connection
    const newFeedback = new Feedback({ name, feedback });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save feedback' });
  }
});

router.get('/', async (req, res) => {
  try {
    const Feedback = getFeedbackModel(); // Get model after DB connection
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    console.error('Error fetching feedback:', err);
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
});

export default router;
