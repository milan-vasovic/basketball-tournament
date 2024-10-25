const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, server } = require("../app");
const { playersData } = require("../utils/load-data");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Player Stats API", () => {
  // Simulate player with no games before running this test
  before(() => {
    playersData.set("playerWithNoGames", []);
    playersData.set("playerWithZeroStats", [
      {
        PLAYER: "playerWithZeroStats",
        POSITION: "SF",
        FTM: "0",
        FTA: "0",
        "2PM": "0",
        "2PA": "0",
        "3PM": "0",
        "3PA": "0",
        REB: "0",
        BLK: "0",
        AST: "0",
        STL: "0",
        TOV: "0",
      },
    ]);
    playersData.set("playerWithNegativeStats", [
      {
        PLAYER: "playerWithNegativeStats",
        POSITION: "SF",
        FTM: "-1",
        FTA: "-2",
        "2PM": "-3",
        "2PA": "-4",
        "3PM": "-5",
        "3PA": "-6",
        REB: "-7",
        BLK: "-8",
        AST: "-9",
        STL: "-10",
        TOV: "-11",
      },
    ]);
    playersData.set('mixedStatsPlayer', [
        {
            PLAYER: 'mixedStatsPlayer', 
            POSITION: 'SF', 
            FTM: '5',
            FTA: '8',  
            '2PM': '2', 
            '2PA': '5', 
            '3PM': '',  
            '3PA': '2', 
            REB: '3',   
            BLK: '1',   
            AST: '-2',  
            STL: '1',   
            TOV: ''     
        },
        {
            PLAYER: 'mixedStatsPlayer', 
            POSITION: 'SF', 
            FTM: '0',  
            FTA: '0',  
            '2PM': '0', 
            '2PA': '0', 
            '3PM': '0', 
            '3PA': '0', 
            REB: '0',   
            BLK: '0',   
            AST: '0',   
            STL: '0',   
            TOV: '0'    
        },
        {
            PLAYER: 'mixedStatsPlayer', 
            POSITION: 'SF', 
            FTM: '-3',  
            FTA: '-2',  
            '2PM': '-1', 
            '2PA': '-3', 
            '3PM': '-2', 
            '3PA': '-3', 
            REB: '-1',   
            BLK: '-1',   
            AST: '-1',   
            STL: '-2',   
            TOV: '-1'    
        }
    ]);    
  });

  // Close the server after all tests are done
  after(() => {
    server.close();
  });

  it("should return correct stats for Sifiso Abdalla", (done) => {
    chai
      .request(server) // Use the running server instance
      .get("/stats/player/Sifiso Abdalla")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("playerName").eql("Sifiso Abdalla");
        expect(res.body).to.have.property("gamesPlayed").eql(3);

        const traditional = res.body.traditional;
        expect(traditional).to.have.property("freeThrows");
        expect(traditional.freeThrows).to.have.property("attempts").eql(4.7);
        expect(traditional.freeThrows).to.have.property("made").eql(3.3);
        expect(traditional.freeThrows)
          .to.have.property("shootingPercentage")
          .eql(71.4);

        expect(traditional).to.have.property("twoPoints");
        expect(traditional.twoPoints).to.have.property("attempts").eql(4.7);
        expect(traditional.twoPoints).to.have.property("made").eql(3.0);
        expect(traditional.twoPoints)
          .to.have.property("shootingPercentage")
          .eql(64.3);

        expect(traditional).to.have.property("threePoints");
        expect(traditional.threePoints).to.have.property("attempts").eql(6.3);
        expect(traditional.threePoints).to.have.property("made").eql(1.0);
        expect(traditional.threePoints)
          .to.have.property("shootingPercentage")
          .eql(15.8);

        expect(traditional).to.have.property("points").eql(12.3);
        expect(traditional).to.have.property("rebounds").eql(5.7);
        expect(traditional).to.have.property("blocks").eql(1.7);
        expect(traditional).to.have.property("assists").eql(0.7);
        expect(traditional).to.have.property("steals").eql(1.0);
        expect(traditional).to.have.property("turnovers").eql(1.3);

        const advanced = res.body.advanced;
        expect(advanced).to.have.property("valorization").eql(11.7);
        expect(advanced)
          .to.have.property("effectiveFieldGoalPercentage")
          .eql(40.9);
        expect(advanced).to.have.property("trueShootingPercentage").eql(46.7);
        expect(advanced).to.have.property("hollingerAssistRatio").eql(4.4);

        done();
      });
  });

  it("should return message when player has not played any games", (done) => {
    chai
      .request(app)
      .get("/stats/player/playerWithNoGames")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property("playerName")
          .eql("playerWithNoGames");
        expect(res.body)
          .to.have.property("msg")
          .eql("Player has not played any games.");
        done();
      });
  });

  it("should return correct stats for a player with zero stats", (done) => {
    chai
      .request(app)
      .get("/stats/player/playerWithZeroStats")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property("playerName")
          .eql("playerWithZeroStats");
        expect(res.body).to.have.property("gamesPlayed").eql(1);

        const traditional = res.body.traditional;
        expect(traditional).to.have.property("freeThrows");
        expect(traditional.freeThrows).to.have.property("attempts").eql(0);
        expect(traditional.freeThrows).to.have.property("made").eql(0);
        expect(traditional.freeThrows)
          .to.have.property("shootingPercentage")
          .eql(0);

        expect(traditional).to.have.property("twoPoints");
        expect(traditional.twoPoints).to.have.property("attempts").eql(0);
        expect(traditional.twoPoints).to.have.property("made").eql(0);
        expect(traditional.twoPoints)
          .to.have.property("shootingPercentage")
          .eql(0);

        expect(traditional).to.have.property("threePoints");
        expect(traditional.threePoints).to.have.property("attempts").eql(0);
        expect(traditional.threePoints).to.have.property("made").eql(0);
        expect(traditional.threePoints)
          .to.have.property("shootingPercentage")
          .eql(0);

        expect(traditional).to.have.property("points").eql(0);
        expect(traditional).to.have.property("rebounds").eql(0);
        expect(traditional).to.have.property("blocks").eql(0);
        expect(traditional).to.have.property("assists").eql(0);
        expect(traditional).to.have.property("steals").eql(0);
        expect(traditional).to.have.property("turnovers").eql(0);

        const advanced = res.body.advanced;
        expect(advanced).to.have.property("valorization").eql(0);
        expect(advanced)
          .to.have.property("effectiveFieldGoalPercentage")
          .eql(0);
        expect(advanced).to.have.property("trueShootingPercentage").eql(0);
        expect(advanced).to.have.property("hollingerAssistRatio").eql(0);

        done();
      });
  });

  it("should handle negative stats by treating them as 0", (done) => {
    chai
      .request(app)
      .get("/stats/player/playerWithNegativeStats")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property("playerName")
          .eql("playerWithNegativeStats");
        expect(res.body).to.have.property("gamesPlayed").eql(1);

        const traditional = res.body.traditional;
        expect(traditional).to.have.property("freeThrows");
        expect(traditional.freeThrows).to.have.property("attempts").eql(0); // Expecting 0 as negative stats are normalized
        expect(traditional.freeThrows).to.have.property("made").eql(0);
        expect(traditional.freeThrows)
          .to.have.property("shootingPercentage")
          .eql(0);

        const advanced = res.body.advanced;
        expect(advanced.valorization).to.eql(0);
        expect(advanced.effectiveFieldGoalPercentage).to.eql(0);
        expect(advanced.trueShootingPercentage).to.eql(0);
        expect(advanced.hollingerAssistRatio).to.eql(0);

        done();
      });
  });

  it('should return correct stats for a player with mixed stats', (done) => {
    chai.request(app)
        .get('/stats/player/mixedStatsPlayer')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('playerName').eql('mixedStatsPlayer');
            expect(res.body).to.have.property('gamesPlayed').eql(3);

            const traditional = res.body.traditional;
            expect(traditional).to.have.property('freeThrows');
            expect(traditional.freeThrows).to.have.property('attempts').eql(2.7);
            expect(traditional.freeThrows).to.have.property('made').eql(1.7);
            expect(traditional.freeThrows).to.have.property('shootingPercentage').eql(62.5);

            expect(traditional).to.have.property('twoPoints');
            expect(traditional.twoPoints).to.have.property('attempts').eql(1.7);
            expect(traditional.twoPoints).to.have.property('made').eql(0.7);
            expect(traditional.twoPoints).to.have.property('shootingPercentage').eql(40);

            expect(traditional).to.have.property('threePoints');
            expect(traditional.threePoints).to.have.property('attempts').eql(0.7);
            expect(traditional.threePoints).to.have.property('made').eql(0);
            expect(traditional.threePoints).to.have.property('shootingPercentage').eql(0);

            expect(traditional).to.have.property('points').eql(3);
            expect(traditional).to.have.property('rebounds').eql(1);
            expect(traditional).to.have.property('blocks').eql(0.3);
            expect(traditional).to.have.property('assists').eql(0);
            expect(traditional).to.have.property('steals').eql(0.3);
            expect(traditional).to.have.property('turnovers').eql(0);

            const advanced = res.body.advanced;
            expect(advanced).to.have.property('valorization').eql(2);
            expect(advanced).to.have.property('effectiveFieldGoalPercentage').eql(28.6);
            expect(advanced).to.have.property('trueShootingPercentage').eql(41.7);
            expect(advanced).to.have.property('hollingerAssistRatio').eql(0);

            done();
        });
    });
    
  it("should return 404 for non-existent player", (done) => {
    chai
      .request(server)
      .get("/stats/player/NonExistentPlayer")
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property("msg").eql("Player not found");
        done();
      });
  });

  it("should handle player names with case insensitivity", (done) => {
    chai
      .request(app)
      .get("/stats/player/sifiso abdalla") // Using lowercase letters
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("playerName").eql("Sifiso Abdalla");
        done();
      });
  });

  it("should return correct stats for a player with mixed-case letters in the name", (done) => {
    chai
      .request(app)
      .get("/stats/player/SIFiso AbDalLa")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("playerName").eql("Sifiso Abdalla");
        done();
      });
  });

  it("should handle SQL injection attempt in player name", (done) => {
    chai
      .request(app)
      .get("/stats/player/Sifiso Abdalla; DROP TABLE players;")
      .end((err, res) => {
        expect(res).to.have.status(404); // Shouldn't find this "player"
        done();
      });
  });

  it("should handle players with empty or null stat fields", (done) => {
    playersData.set("PlayerWithEmptyFields", [
      {
        PLAYER: "PlayerWithEmptyFields",
        POSITION: "SG",
        FTM: "",
        FTA: null,
        "2PM": "",
        "2PA": "",
        "3PM": "",
        "3PA": "",
        REB: "",
        BLK: "",
        AST: "",
        STL: "",
        TOV: "",
      },
    ]);

    chai
      .request(app)
      .get("/stats/player/PlayerWithEmptyFields")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.traditional.freeThrows.attempts).to.eql(0);
        done();
      });
  });

  it("should handle a large dataset without timing out", (done) => {
    const largeDataset = []; // Generate a large dataset of players
    for (let i = 0; i < 10000; i++) {
      largeDataset.push({
        PLAYER: `Player${i}`,
        POSITION: "SF",
        FTM: "1",
        FTA: "1",
        "2PM": "1",
        "2PA": "1",
        "3PM": "1",
        "3PA": "1",
        REB: "1",
        BLK: "1",
        AST: "1",
        STL: "1",
        TOV: "1",
      });
    }
    playersData.set("PlayerWithLargeDataset", largeDataset);

    chai
      .request(app)
      .get("/stats/player/PlayerWithLargeDataset")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("Player Stats API with no data", () => {
  before(() => {
    playersData.clear(); // Clear all loaded player data to simulate an empty CSV file
  });

  it("should return 404 when no data is loaded and Sifiso Abdalla is requested", (done) => {
    chai
      .request(app)
      .get("/stats/player/Sifiso Abdalla")
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property("msg").eql("Player not found");
        done();
      });
  });

  it("should return 404 for case-insensitive player search when no data is loaded", (done) => {
    chai
      .request(app)
      .get("/stats/player/sifiso abdalla")
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property("msg").eql("Player not found");
        done();
      });
  });
});
