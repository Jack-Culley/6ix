
// adds event listener on "Play Game!" button
let playGameButton_element = document.getElementById("playGameButton");

// calls get player data function
playGameButton_element.addEventListener("click", getPlayerData);

// moves to classic mode game window
playGameButton_element.addEventListener("click", () => {window.location.href='classicMode.html';});


// function to get data regarding number of human players selected, stores arrays in sessionStorage
function getPlayerData()
{
    const humanPlayersArray = [];

    let numberOfHumans = document.getElementById("humanPlayersList").getElementsByTagName("li").length;

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


    // stores arrays for use on next screen
    sessionStorage.setItem("humanPlayersArray",humanPlayersArray);
}
