import { getRandomInt } from '../cards/cardObjects.js'

const easy = 1;
const medium = 2;
const hard = 3;
const insane = 4;

function CPU(difficulty, name){
    this.difficulty = difficulty;
    this.score = 0;
    this.sets = [];
    this.name = name;
    this.isNextSetCorrect = function(){
        if(getRandomInt(100/this.difficulty) < Math.floor(100/(this.difficulty+1))) return true;
        else return false;
    }
    this.timeout = 15000 - 3000*this.difficulty;
}

function CPUTurn(cpu){
    setTimeout(() => {}, cpu.timeout);
    if(cpu.isNextSetCorrect){
        cpu.winSet(Array.from(boatSets).sets.pop());
        cpu.increaseScore();
    } else {
        //what to do to show cpu guessed incorrectly?
        //highlight random cards or just decrease score and display a message saying "CPU[] guessed incorrectly"
        cpu.decrementScore();
    }
}

var user = new Player("user");
//makes these two calls whenever game launches and the user is instantiated
CPU.prototype = user;
CPU.prototype.constructor = CPU;

var eCPU = new CPU(easy, 1);
var mCPU = new CPU(medium, 2);
var hCPU = new CPU(hard, 3);
var iCPU = new CPU(insane, 4);

//test function to show the odds of the cpu picking a correct set for each level of difficulty
function showOdds(cpu){
    let t = 0;
    let f = 0;
    for(let i = 0; i < 100; i++){
        if(cpu.isNextSetCorrect()){
            t += 1;
        } else {
            f += 1;
        }
    }
    console.log(cpu.difficulty);
    console.log('incorrect set chance: ' + f/100);
    console.log('correct set chance: ' + t/100);
}

showOdds(eCPU);
showOdds(mCPU);
showOdds(hCPU);
showOdds(iCPU);



//class implementation. Inherited players methods but could not find methods defined in CPU class. May be more redundant as well
// class CPU{
//     constructor(difficulty, player, name){
//         this.difficulty = difficulty;
//         this.score = 0;
//         this.sets = [];
//         this.name = name;
//         Object.setPrototypeOf(this, player);
//     }

//     wait(func, time){
//         setTimeout(func, time);
//     }

//     takeTurn(){

//     }

//     /** function to determine if the cpu should make a mistake or not.  The odds of cpu making correct set for each difficulty according to the function are as follows:
//      * easy - 50%
//      * medium - 66%
//      * hard - 76%
//      * insane - 80%
//      *
//      * @returns false if no mistake should be made else true.
//      */
//     isMistake(){
//         if(getRandomInt(100/this.difficulty) < Math.floor(100/(this.difficulty+1))) return false;
//         else return true;
//     }
// }

// var user = new Player("user");
// //makes these two calls whenever game launches and the user is instantiated
// CPU.prototype = user;
// CPU.prototype.constructor = CPU;
