/*
* Author: Drew Holowaty
*
* Purpose: The purose of this JS script is to provide functions that enable the end user to
* select the number of human and CPU players for the Set classic game mode. The user is able to
* input names for human players as well as select the difficulty for each computer player.
*/

/*
* HTML ID Naming conventions
*
* text input for human player name: human_#
*
*/


//global variables
let humanPlayersCount = 0;
const MAX_PLAYERS = 8;



// fucntion to change html buttons, display warning messages, etc depending on the number of total
// players selected
function changeHTMLBasedOnPlayerNumber(){

    // if total players is greater than max count, display warning message and disable/enable buttons
    if ((humanPlayersCount) >= MAX_PLAYERS)
    {
        // display warning message
        document.getElementById("max_player_warning").style.display = "block";
        // disable add item buttons
        document.getElementById("addHumanPlayersButton").disabled = true;
    } else {
        document.getElementById("max_player_warning").style.display = "none";
        // enable add item buttons
        document.getElementById("addHumanPlayersButton").disabled = false;
    }

    // if count for humans or cpu players is more than 0, enable "delete item" button
    if(humanPlayersCount > 0)
    {
        document.getElementById("removeHumanPlayersButton").disabled = false;
    } else {
        document.getElementById("removeHumanPlayersButton").disabled = true;
    }
};

// function to add number of human players to classicMode
function addHumanPlayers(){
    // creates and styles input box
    newInputBox = document.createElement("input");
    newInputBox.setAttribute("type", "text");
    newInputBox.setAttribute("class","input is-small");
    newInputBox.setAttribute("style","width: 33%");
    newInputBox.setAttribute("placeholder","player name");

    // creates and sets id for input field
    newInputBox.setAttribute("id","human_"+humanPlayersCount.toString());

    // creates and list item element
    newListElement = document.createElement("li");
    newListElement.setAttribute("id","humanListNumber_"+humanPlayersCount.toString());

    newListElement.innerHTML = "Player " + (humanPlayersCount + 1).toString() + ":  ";
    newListElement.appendChild(newInputBox);

    document.getElementById("humanPlayersList").appendChild(newListElement);

    humanPlayersCount++;
    changeHTMLBasedOnPlayerNumber();
}

// function to remove human player
function removeHumanPlayers(){
    if (humanPlayersCount < 1)
    {
        return; // does nothing because there is no players to remove
    } else {
        let listParent = document.getElementById("humanPlayersList");
        let listItemChild = document.getElementById("humanListNumber_"+(humanPlayersCount - 1).toString());

        listParent.removeChild(listItemChild);
        humanPlayersCount--;
        changeHTMLBasedOnPlayerNumber();
    }
}
