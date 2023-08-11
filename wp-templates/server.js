
const envConfig = require("dotenv").config();
const express = require("express");
const Ably = require("ably");
const app = express();
const ABLY_API_KEY = process.env.ABLY_API_KEY;

const GAME_TICKER_MS = 100;

let peopleAccessingTheWebsite = 0;
let players = {};
let playerChannels = {};
let gameOn = false;
let activePlayers = 0;
let totalPlayers = 0;
let gameRoom;
let deadPlayerCh;
let gameTickerOn = false;

const realtime = Ably.Realtime({
    key: ABLY_API_KEY,
    echoMessages: false,
  });
  
  //create a uniqueId to assign to clients on auth
  const uniqueId = function () {
    return "id-" + totalPlayers + Math.random().toString(36).substr(2, 16);
  };
  
  app.use(express.static("js"));
  
  app.get("/auth", (request, response) => {
    const tokenParams = { clientId: uniqueId() };
    realtime.auth.createTokenRequest(tokenParams, function (err, tokenRequest) {
      if (err) {
        response
          .status(500)
          .send("Error requesting token: " + JSON.stringify(err));
      } else {
        response.setHeader("Content-Type", "application/json");
        response.send(JSON.stringify(tokenRequest));
      }
    });
  });
  
  app.get("/", (request, response) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    response.sendFile(__dirname + "/front-page.js");
  });
  
  app.get("/gameplay", (request, response) => {
    response.sendFile(__dirname + "/page.js");
  });
  
  const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });

  realtime.connection.once("connected", () => {
    gameRoom = realtime.channels.get("game-room");
    spectatorCh = realtime.channels.get("spectating-player");
    gameRoom.presence.subscribe("enter", (player) => {
        let newPlayerId;
        let newPlayerData;
        activePlayers++;
        totalPlayers++;

        if (totalPlayers === 1) {
            gameTickerOn = true;
            startGameDataTicker();
        }

        newPlayerId = player.clientId;
        playerChannels[newPlayerId] = realtime.channels.get("clientChannel-" + player.clientId);

        newPlayerObject = {
            id: newPlayerId,
            nickname: player.data,
            isActive: true,
            cardValue: ""
        };

        players[newPlayerId] = newPlayerObject;
        if(totalPlayers === 1) {
            startGameSession();
        }
        subscribeToPlayerInput(playerChannels[newPlayerId], newPlayerId);

    });
    gameRoom.presence.subscribe("leave", (player) => {
        let leavingPlayer = player.clientId;
        activePlayers--;
        totalPlayers--;
        delete players[leavingPlayer];
        if (totalPlayers <= 0) {
            resetServerState();
        }
    });
    spectatorCh.subscribe("spectate-notif", (msg) => {
        players[msg.data.spectatingPlayerId].isActive = false;
        activePlayers--;
        if (activePlayers == 0) {
            setTimeout(() => {
            finishGame("");
            }, 1000);
        }
    });
  });

function startGameDataTicker() {
    let tickInterval = setInterval(() => {
        if (!gameTickerOn) {
          clearInterval(tickInterval);
        } else {
          
          gameRoom.publish("game-state", {
            players: players,
            playerCount: totalPlayers,
            gameOn: gameOn,
          });
        }
    }, GAME_TICKER_MS);
}

function subscribeToPlayerInput(channelInstance, playerId) {
    channelInstance.subscribe("pos", (msg) => {
        if (msg.data.keyPressed == "left") {
            if (players[playerId].x - 20 < 20) {
            players[playerId].x = 20;
            } else {
            players[playerId].x -= 20;
            }
        } else if (msg.data.keyPressed == "right") {
            if (players[playerId].x + 20 > 1380) {
            players[playerId].x = 1380;
            } else {
            players[playerId].x += 20;
            }
        }
    });
}

function startDownwardMovement(playerId) {
    let interval = setInterval(() => {
        if (players[playerId] && players[playerId].isAlive) {
          players[playerId].y += PLAYER_VERTICAL_INCREMENT;
          players[playerId].score += PLAYER_SCORE_INCREMENT;
    
          if (players[playerId].y > SHIP_PLATFORM) {
            finishGame(playerId);
            clearInterval(interval);
          }
        } else {
          clearInterval(interval);
        }
      }, PLAYER_VERTICAL_MOVEMENT_UPDATE_INTERVAL);
}

function finishGame(playerId) {
    let firstRunnerUpName = "";
  let secondRunnerUpName = "";
  let winnerName = "Nobody";
  let leftoverPlayers = new Array();
  for (let item in players) {
    leftoverPlayers.push({
      nickname: players[item].nickname,
      score: players[item].score,
    });
  }

  leftoverPlayers.sort((a, b) => {
    return b.score - a.score;
  });
  if (playerId == "") {
    if (leftoverPlayers.length >= 3) {
      firstRunnerUpName = leftoverPlayers[0].nickname;
      secondRunnerUpName = leftoverPlayers[1].nickname;
    } else if (leftoverPlayers == 2) {
      firstRunnerUp = leftoverPlayers[0].nickname;
    }
  } else {
    winnerName = players[playerId].nickname;
    if (leftoverPlayers.length >= 3) {
      firstRunnerUpName = leftoverPlayers[1].nickname;
      secondRunnerUpName = leftoverPlayers[2].nickname;
    } else if (leftoverPlayers.length == 2) {
      firstRunnerUpName = leftoverPlayers[1].nickname;
    }
  }

  gameRoom.publish("game-over", {
    winner: winnerName,
    firstRunnerUp: firstRunnerUpName,
    secondRunnerUp: secondRunnerUpName,
    totalPlayers: totalPlayers,
  });

  resetServerState();
}

function resetServerState() {
    peopleAccessingTheWebsite = 0;
  gameOn = false;
  gameTickerOn = false;
  totalPlayers = 0;
  alivePlayers = 0;
  for (let item in playerChannels) {
     playerChannels[item].unsubscribe();
  }
}

function startShipAndBullets() {}