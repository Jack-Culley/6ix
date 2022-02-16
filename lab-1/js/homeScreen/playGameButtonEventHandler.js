import {generatePlayerObjects} from "../board/classicModeAddPlayers.js"

// adds event listener on "Play Game!" button
let playGameButton_element = document.getElementById("playGameButton");

// calls get player data function
playGameButton_element.addEventListener("click", getPlayerData);

// moves to classic mode game window
//playGameButton_element.addEventListener("click", () => {window.location.href='classicMode.html';});


// function to get data regarding number of human players selected, calls function from board 
// functions with information array of players as an input. The baord function will create a player 
// object for each element in the array, and generate the corresponding html to show this data on the
// classic mode screen
function getPlayerData()
{
    const humanPlayersArray = [];
    const cpuPlayersArray = [];

    let numberOfHumans = document.getElementById("humanPlayersList").getElementsByTagName("li").length;
    let numberOfCPUs = document.getElementById("cpuPlayersList").getElementsByTagName("li").length;

    // loops through number of humans players, gets data based on generated list item ids
    for (let i = 0; i < numberOfHumans; i++) {
        let tempId = "human_" + i.toString();
        let name = document.getElementById(tempId).value;

        // if name is not given, default name of "player_#" is given
        if (name.localeCompare('') == 0) {
            name = "Player " + (i + 1).toString(); 
        }
        humanPlayersArray.push(name);
    }

    // loops through number of cpu players, gets data based on generated list item ids
    for(let i = 0; i < numberOfCPUs; i++) {
        let tempId = "cpu_" + i.toString();
        let tempElement = document.getElementById(tempId);
        let difficulty = tempElement.options[tempElement.selectedIndex].text;
        cpuPlayersArray.push(difficulty);
    }

    // // calls board function
    generatePlayerObjects(humanPlayersArray,cpuPlayersArray);

}
