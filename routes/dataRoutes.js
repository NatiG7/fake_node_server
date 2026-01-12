const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/alerts', dataController.getAllAlerts);

module.exports = router;
