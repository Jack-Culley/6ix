//global variables
let humanPlayersCount = 0;
let cpuPlayersCount = 0;


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
    }
}

// function to add number of cpu players to classicMode as well as their difficulty 
function addCPUPlayers(){
    // creates and styles CPU component and adds options for all difficulties
    selectElement = document.createElement("select");

    easyOption = document.createElement("option");
    easyOption.setAttribute("value","easy");
    easyOption.innerHTML = "Easy";

    mediumOption = document.createElement("option");
    mediumOption.setAttribute("value","medium");
    mediumOption.innerHTML = "Medium";

    hardOption = document.createElement("option");
    hardOption.setAttribute("value","hard");
    hardOption.innerHTML = "Hard";

    insaneOption = document.createElement("option");
    insaneOption.setAttribute("value","insane");
    insaneOption.innerHTML = "Insane";

    selectElement.appendChild(easyOption);
    selectElement.appendChild(mediumOption);
    selectElement.appendChild(hardOption);
    selectElement.appendChild(insaneOption);


    // creates list item element
    newListElement = document.createElement("li");
    newListElement.setAttribute("id","cpuListNumber_"+cpuPlayersCount.toString());

    newListElement.innerHTML = "CPU " + (cpuPlayersCount + 1).toString() + ":  "; 
    newListElement.appendChild(selectElement);

    document.getElementById("cpuPlayersList").appendChild(newListElement);

    cpuPlayersCount++;

}

// function to remove cpu player
function removeCPUPlayers(){
    if (cpuPlayersCount < 1)
    {
        return; // does nothing because there is no players to remove
    } else {
        let listParent = document.getElementById("cpuPlayersList");
        let listItemChild = document.getElementById("cpuListNumber_"+(cpuPlayersCount - 1).toString());

        listParent.removeChild(listItemChild);
        cpuPlayersCount--;
    }
}
