const { loadDataFromFile, playersData } = require('../utils/load-data');

exports.getDataFromFile = (req, res, next) => {
    try {
        loadDataFromFile()
            .then(() => {
                res.status(200).json({ message: 'Data loaded successfully', players: Array.from(playersData.entries()) });
            })
            .catch((err) => {
                console.error('Error loading data:', err);
                res.status(500).json({ msg: 'Error loading CSV data' });
            });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ msg: 'An error occurred while processing the request' });
    }
};
