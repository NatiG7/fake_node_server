// Nati G.

const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const isAuthenticated = require('../middleware/authMiddle');

router.get('/alerts', isAuthenticated, dataController.getAllAlerts);
router.post('/alerts', isAuthenticated, dataController.addAlert);
router.delete('/alerts/:id', isAuthenticated, dataController.deleteAlert);

module.exports = router;
