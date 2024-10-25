// Import express
const express = require("express");

// Import Router from express
const router = express.Router();

const playerController = require('../controllers/player');

router.get('/stats/player/:playerFullName', playerController.getPlayerStatsFromName);

// Exports router 
module.exports = router;