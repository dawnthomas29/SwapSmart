import mongoose from 'mongoose';
import { connections } from '../config/db.js';

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  feedback: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Avoid recompiling model on hot reload or repeated use
export const getFeedbackModel = () => {
  if (!connections.feedback) {
    throw new Error('Feedback DB connection not initialized');
  }

  return connections.feedback.models.Feedback || connections.feedback.model('Feedback', feedbackSchema);
};
