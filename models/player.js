class Player {
    constructor(name, games) {
        this.name = name;
        this.games = games;
    }

    normalizeStat(value) {
        return Math.max(0, parseFloat(value) || 0);
    }

    calculateStats() {
        return this.games.reduce((acc, game) => {
            acc.FTM += this.normalizeStat(game.FTM);
            acc.FTA += this.normalizeStat(game.FTA);
            acc["2PM"] += this.normalizeStat(game["2PM"]);
            acc["2PA"] += this.normalizeStat(game["2PA"]);
            acc["3PM"] += this.normalizeStat(game["3PM"]);
            acc['3PA'] += this.normalizeStat(game['3PA']);
            acc.REB += this.normalizeStat(game.REB);
            acc.BLK += this.normalizeStat(game.BLK);
            acc.AST += this.normalizeStat(game.AST);
            acc.STL += this.normalizeStat(game.STL);
            acc.TOV += this.normalizeStat(game.TOV);
            acc.PTS += this.normalizeStat(game.FTM) + 2 * this.normalizeStat(game['2PM']) + 3 * this.normalizeStat(game['3PM']);
            return acc;
        }, { FTM: 0, FTA: 0, '2PM': 0, '2PA': 0, '3PM': 0, '3PA': 0, REB: 0, BLK: 0, AST: 0, STL: 0, TOV: 0, PTS: 0 });
    }

    calculateAveragesStats() {
        const totalGames = this.games.length;
    
        if (totalGames === 0) {
            return {
                playerName: this.name,
                gamesPlayed: 0,
                traditional: {
                    freeThrows: { attempts: 0, made: 0, shootingPercentage: 0 },
                    twoPoints: { attempts: 0, made: 0, shootingPercentage: 0 },
                    threePoints: { attempts: 0, made: 0, shootingPercentage: 0 },
                    points: 0,
                    rebounds: 0,
                    blocks: 0,
                    assists: 0,
                    steals: 0,
                    turnovers: 0
                },
                advanced: {
                    valorization: 0,
                    effectiveFieldGoalPercentage: 0,
                    trueShootingPercentage: 0,
                    hollingerAssistRatio: 0
                },
                msg: 'Player has not played any games.'
            };
        }
        
        const totalStats = this.calculateStats();
    
        return {
            playerName: this.name,
            gamesPlayed: totalGames,
            traditional: {
                freeThrows: {
                    attempts: parseFloat((totalStats.FTA / totalGames).toFixed(1)) || 0,
                    made: parseFloat((totalStats.FTM / totalGames).toFixed(1)) || 0,
                    shootingPercentage: totalStats.FTA > 0 ? parseFloat(((totalStats.FTM / totalStats.FTA) * 100).toFixed(1)) : 0
                },
                twoPoints: {
                    attempts: parseFloat((totalStats['2PA'] / totalGames).toFixed(1)) || 0,
                    made: parseFloat((totalStats['2PM'] / totalGames).toFixed(1)) || 0,
                    shootingPercentage: totalStats['2PA'] > 0 ? parseFloat(((totalStats['2PM'] / totalStats['2PA']) * 100).toFixed(1)) : 0
                },
                threePoints: {
                    attempts: parseFloat((totalStats['3PA'] / totalGames).toFixed(1)) || 0,
                    made: parseFloat((totalStats['3PM'] / totalGames).toFixed(1)) || 0,
                    shootingPercentage: totalStats['3PA'] > 0 ? parseFloat(((totalStats['3PM'] / totalStats['3PA']) * 100).toFixed(1)) : 0
                },
                points: parseFloat((totalStats.PTS / totalGames).toFixed(1)) || 0,
                rebounds: parseFloat((totalStats.REB / totalGames).toFixed(1)) || 0,
                blocks: parseFloat((totalStats.BLK / totalGames).toFixed(1)) || 0,
                assists: parseFloat((totalStats.AST / totalGames).toFixed(1)) || 0,
                steals: parseFloat((totalStats.STL / totalGames).toFixed(1)) || 0,
                turnovers: parseFloat((totalStats.TOV / totalGames).toFixed(1)) || 0
            },
            advanced: {
                valorization: parseFloat((((
                    totalStats.FTM + 
                    (2 * totalStats['2PM']) + 
                    (3 * totalStats['3PM']) + 
                    totalStats.REB + 
                    totalStats.BLK + 
                    totalStats.AST + 
                    totalStats.STL) - 
                    ((totalStats.FTA - totalStats.FTM) + 
                    (totalStats['2PA'] - totalStats['2PM']) + 
                    (totalStats['3PA'] - totalStats['3PM']) + 
                    totalStats.TOV)) / totalGames).toFixed(1)) || 0,
                
                effectiveFieldGoalPercentage: (totalStats['2PA'] + totalStats['3PA']) > 0 
                    ? parseFloat(((totalStats['2PM'] + 1.5 * totalStats['3PM']) / (totalStats['2PA'] + totalStats['3PA']) * 100).toFixed(1)) || 0
                    : 0,
                
                trueShootingPercentage: (totalStats['2PA'] + totalStats['3PA'] + 0.475 * totalStats.FTA) > 0 
                    ? parseFloat((totalStats.PTS / (2 * (totalStats['2PA'] + totalStats['3PA'] + 0.475 * totalStats.FTA)) * 100).toFixed(1)) || 0
                    : 0,
            
                hollingerAssistRatio: (totalStats['2PA'] + totalStats['3PA'] + 0.475 * totalStats.FTA + totalStats.AST + totalStats.TOV) > 0
                    ? parseFloat((totalStats.AST / (totalStats['2PA'] + totalStats['3PA'] + 0.475 * totalStats.FTA + totalStats.AST + totalStats.TOV) * 100).toFixed(1)) || 0
                    : 0
            }
        }
    }
}

module.exports = Player;