import { Player } from "../player/player.js";

export const humanPlayers = [];

// function to generate objects for computer and human players
// humanPlayersNames: [Player 1, Player 2, ...]
// cpuPlayersNames: [easy, medium, hard, insane, ...]
function generatePlayerObjects(){


    let humanPlayersNamesStr = sessionStorage.getItem("humanPlayersArray");
    const humanPlayersNames = humanPlayersNamesStr === "" ? [] : humanPlayersNamesStr.split(",");

    let cpuPlayersNamesStr = sessionStorage.getItem("cpuPlayersArray");
    const cpuPlayersNames = cpuPlayersNamesStr === "" ? [] : cpuPlayersNamesStr.split(",");

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

     // loops through cpuPlayersNames, generates corresponding html element and objects
     for (let i=0; i < cpuPlayersNames.length; i++) {
        // creates individual column
        let playerColumn = document.createElement("div");
        playerColumn.setAttribute("class","column is-flex is-justify-content-center");
        playerColumn.innerHTML = cpuPlayersNames[i];

        // adds column to paretn columns
        playerDisplay.appendChild(playerColumn);
    }
}

generatePlayerObjects();
