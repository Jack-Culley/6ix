class Player{
	//Constructor for player objects
	constructor(name) {
		this.name = name;
		this.score = 0;
		this.sets = [];
		this.isTurn = false;
	}

	// function to add set
	executeTurn() {
		// function to get set of cards
		// if returned cards is set
		this.sets.push(/*returned set*/);
		this.score++;
		// updates html
		let playerID = this.name + "_scoreID";
		let scoreText = document.getElementById(playerID);
		scoreText.innerHTML = this.score;
	}
}

export { Player };
