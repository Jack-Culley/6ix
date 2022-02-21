class Player{
	//Constructor for player objects
	constructor(name) {
		this.name = name;
		this.score = 0;
		this.isTurn = false;
	}

	gotSet(){
		this.score++;
		this.isTurn = false;
	}

	failedSet(){
		this.score--;
		this.isTurn = false;
	}

	updateHTML(){
		// updates html
		let playerID = this.name + "_scoreID";
		let scoreText = document.getElementById(playerID);
		scoreText.innerHTML = this.score;
	}
}

export { Player };
