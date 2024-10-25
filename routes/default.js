// Import express
const express = require("express");

// Import Router from express
const router = express.Router();

const defaultController = require('../controllers/defaults');

router.get('/', defaultController.getDataFromFile);

// Exports router 
module.exports = router;

