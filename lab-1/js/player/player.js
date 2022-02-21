import {clickedCards, checkIfSet} from "../board/boardFunctions.js";
class Player{
	//Constructor for player objects
	constructor(name) {
		this.name = name;
		this.score = 0;
		this.sets = [];
	}

	// function to add set
	executeTurn() {
		// function to get set of cards
		console.log(clickedCards);
		if(clickedCards.size >= 3) {
			if(!checkIfSet()){
				this.score--;
			} else {
				this.score++;
			}
		}
		// updates html
		let playerID = this.name + "_scoreID";
		let scoreText = document.getElementById(playerID);
		scoreText.innerHTML = this.score;
	}
}

export { Player };
