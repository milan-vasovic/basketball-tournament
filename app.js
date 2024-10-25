const express = require("express");
const bodyParser = require("body-parser");
const { loadDataFromFile, playersData } = require('./utils/load-data');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const defaultRoutes = require('./routes/default');
const playerRoutes = require('./routes/player');

loadDataFromFile()
    .then(() => {
        console.log("Data loaded successfully on app start");
    })
    .catch((err) => {
        console.error("Error loading data at startup:", err);
    });

app.use(defaultRoutes);
app.use(playerRoutes);

app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Internal Server Error';
    res.status(status).json({
        msg: message,
        error: {
            status: status,
            message: message
        }
    });
});

const server = app.listen(3000, () => {
    console.log("Server running on port 3000");
});

module.exports = { app, server, playersData };