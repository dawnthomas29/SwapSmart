const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Route to submit new feedback
router.post('/', feedbackController.addFeedback);

// Route to get all feedback
router.get('/', feedbackController.getAllFeedback);

module.exports = router;
