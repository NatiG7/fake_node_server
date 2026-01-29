// Nati G.

const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/alerts', dataController.getAllAlerts);
router.post('/alerts/', dataController.addAlert);
router.delete('/alerts/:id',dataController.deleteAlert);

module.exports = router;
