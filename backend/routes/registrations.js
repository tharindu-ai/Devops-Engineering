const express = require('express');
const router = express.Router();
const { registerEvent, getUserRegistrations, unregisterEvent, getEventRegistrations } = require('../controllers/registrationController');
const verifyToken = require('../middleware/verifyToken');

// Protected routes (require authentication)
router.post('/', verifyToken, registerEvent);
router.get('/', verifyToken, getUserRegistrations);
router.delete('/:id', verifyToken, unregisterEvent);
router.get('/event/:eventId', verifyToken, getEventRegistrations);

module.exports = router;
