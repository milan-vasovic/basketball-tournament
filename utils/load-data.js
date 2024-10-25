const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const playersData = new Map();

// Function to load the data from the CSV file
const loadDataFromFile = () => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '../data/L9HomeworkChallengePlayersInput.csv'))
            .pipe(csv({ headers: ['PLAYER', 'POSITION', 'FTM', 'FTA', '2PM', '2PA', '3PM', '3PA', 'REB', 'BLK', 'AST', 'STL', 'TOV'], skipLines: 1 }))
            .on('data', (row) => {
                const playerName = row['PLAYER'] ? row['PLAYER'].trim() : undefined;
                if (playerName) {
                    if (playersData.has(playerName)) {
                        playersData.get(playerName).push(row);
                    } else {
                        playersData.set(playerName, [row]);
                    }
                }
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
                resolve();
            })
            .on('error', (err) => {
                console.error('Error reading CSV file:', err);
                reject(err);
            });
    });
};

module.exports = { loadDataFromFile, playersData };
