const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

router.post('/', complaintController.createComplaint);

router.get('/', complaintController.getComplaints);

router.delete('/:id', complaintController.deleteComplaint);

module.exports = router;
