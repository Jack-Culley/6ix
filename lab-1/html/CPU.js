const easy = 12000;
const medium = 9000;
const hard = 6000;
const insane = 3000;

class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.sets = [];
    }

    increaseScore(num){
        this.score += num;
    }
    
}

class CPU{
    constructor(difficulty, player, name){
        this.difficulty = difficulty;
        this.score = 0;
        this.sets = [];
        this.name = name;
        Object.setPrototypeOf(this, player);
    }

    wait(func, time){
        setTimeout(func, time);
    }

    
}

var player = new Player("Player");
var cpu = new CPU(easy, player, 1);

