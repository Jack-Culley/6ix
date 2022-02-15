class Player{
	//Constructor for player objects
	constructor(name) {
		this.name = name;
		this.score = 0;
		this.sets = [];
	}

	incrementScore(){
		this.score++;
	}

	decrementScore(){
		this.score--;
	}

	winSet(wonSet){
		this.sets.push(wonSet);
	}
}
