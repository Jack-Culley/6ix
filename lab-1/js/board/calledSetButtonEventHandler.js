import { humanPlayers } from "../board/classicModeAddPlayers.js";


// function that allows user to choose which player called set
function chooseHumanPlayer() {
    // loops through humanPlayers and generates and html button for each
    for(let i = 0; i < humanPlayers.length; i++) {
        let playerButton = document.createElement("button");
        playerButton.innerHTML = humanPlayers[i].name;
        // adds button to html
        document.getElementById("modalBodyPlayerButtonList").appendChild(playerButton);

        // creates an onclick event for each player button. When the computer user chooses a player, the
        // onclick event will close the modal and allow the computer user to pick three cards. This onclick
        // event will also call the player class function to update the player's score and set count
        let chooseHumanPlayersModal = document.getElementById("chooseHumanPlayers");

        // calls function to allow player to pick sets
        playerButton.addEventListener("click",() => { humanPlayers[i].isTurn = true });

        // closes modal
        playerButton.addEventListener("click", () => {chooseHumanPlayersModal.classList.remove('is-active');});
    }

}



chooseHumanPlayer();
