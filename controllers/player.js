const Player = require('../models/player');
const { playersData } = require('../utils/load-data');

exports.getPlayerStatsFromName = (req, res, next) => {
    try {
        const playerName = decodeURIComponent(req.params.playerFullName.trim().toLowerCase());

        const playerEntry = Array.from(playersData.entries()).find(([key]) => key.trim().toLowerCase() === playerName);

        if (!playerEntry) {
            return res.status(404).json({ msg: `Player not found` });
        }

        const [originalPlayerName, playerGames] = playerEntry;

        // Check if the player has no games
        if (playerGames.length === 0) {
            return res.status(200).json({
                playerName: originalPlayerName,
                msg: "Player has not played any games."
            });
        }

        const playerStats = new Player(originalPlayerName, playerGames);

        res.status(200).json(playerStats.calculateAveragesStats());
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ msg: `Unexpected error! ${err.message}` });
    }
};
