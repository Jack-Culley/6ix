import { Player, CPU } from "../player/player.js";

export const humanPlayers = [];
export const cpuPlayers = [];

// function to generate objects for computer and human players
// humanPlayersNames: [Player 1, Player 2, ...]
// cpuPlayerDifficulty: [easy, medium, hard, insane, ...]
function generatePlayerObjects(){


    let humanPlayersNamesStr = sessionStorage.getItem("humanPlayersArray");
    const humanPlayersNames = humanPlayersNamesStr === "" ? [] : humanPlayersNamesStr.split(",");

    let cpuPlayersDifficultyStr = sessionStorage.getItem("cpuPlayersArray");
    const cpuPlayerDifficulty = cpuPlayersDifficultyStr === "" ? [] : cpuPlayersDifficultyStr.split(",");

    let playerDisplay = document.getElementById("playerDisplay");
    
    // loops through humanPlayersNames, generates corresponding html element and objects
    for (let i=0; i < humanPlayersNames.length; i++) {
        // creates individual column
        let playerColumn = document.createElement("div");
        playerColumn.setAttribute("class","column has-text-centered");

        // creates Player object for human player
        humanPlayers[i] = new Player(humanPlayersNames[i]);

        // creates elements for player name 
        let nameText = document.createElement("p");
        nameText.innerHTML = humanPlayers[i].name;

        let scoreText = document.createElement("p");
        scoreText.innerHTML = humanPlayers[i].score;

        let scoreTextId = humanPlayers[i].name + "_scoreID";
        scoreText.setAttribute("id",scoreTextId);

        // adds information to column
        playerColumn.appendChild(nameText);
        playerColumn.appendChild(scoreText);

        // adds column to parent columns
        playerDisplay.appendChild(playerColumn);
    }

     // loops through cpuPlayerDifficulty, generates corresponding html element and objects
     for (let i=0; i < cpuPlayerDifficulty.length; i++) {
        // creates individual column
        let playerColumn = document.createElement("div");
        playerColumn.setAttribute("class","column has-text-centered");

        // creates Player object for cpu player
        let cpuName = cpuPlayerDifficulty[i] + " CPU " + (i+1).toString();
        cpuPlayers[i] = new CPU(cpuPlayerDifficulty[i], cpuName);

        // creates elements for player name 
        let nameText = document.createElement("p");
        nameText.innerHTML = cpuPlayers[i].name;

        let scoreText = document.createElement("p");
        scoreText.innerHTML = cpuPlayers[i].score;

        let scoreTextId = cpuPlayers[i].name + "_scoreID";
        scoreText.setAttribute("id",scoreTextId);

        // adds information to column
        playerColumn.appendChild(nameText);
        playerColumn.appendChild(scoreText);

        // adds column to parent columns
        playerDisplay.appendChild(playerColumn);
    }
}

console.log(cpuPlayers);
generatePlayerObjects();
