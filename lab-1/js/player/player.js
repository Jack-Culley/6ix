import { getRandomInt, highlightCard, board } from '../board/boardFunctions.js';

const Easy = 1;
const Medium = 2;
const Hard = 3;
const Insane = 4;

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

class CPU extends Player {
    constructor(difficulty, name) {
		super(name);
        this.difficulty = difficulty;
        this.timeout = 15000 - 3000*this.difficulty;
    }

    isNextSetCorrect(){
        if(getRandomInt(100/this.difficulty) < Math.floor(100/(this.difficulty+1))) return true;
        else return false;
    }
}

//function to do a CPU turn. When its time for a CPU to do something, can just call the function
function CPUTurn(cpu){
    setTimeout(() => {}, cpu.timeout);
    if(cpu.isNextSetCorrect){
        cpu.winSet(Array.from(boardSets).sets.pop());
        cpu.increaseScore();
        document.getElementById("game-move").innerHTML = "CPU" + cpu.name + "chose a correct set!";
    } else {
        //highlights random cards for 2 seconds
        highlightCard(true, board[getRandomInt(12)]);
        highlightCard(true, board[getRandomInt(12)]);
        highlightCard(true, board[getRandomInt(12)]);
        setTimeout(() =>{
            highlightCard(false, board[getRandomInt(12)]);
            highlightCard(false, board[getRandomInt(12)]);
            highlightCard(false, board[getRandomInt(12)]);
        }, 2000);
        cpu.decrementScore();
        document.getElementById("game-move").innerHTML = "CPU" + cpu.name + "chose an incorrect set!";
    }
}

export { Player, CPU, CPUTurn };
