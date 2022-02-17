import { generateBoard, createAddCardButton, cards, addCards, board } from './boardFunctions.js';

let t = 3;
let countDown = setInterval(gameStart, 1000);
document.getElementById("mesgTop").innerHTML = "Get Ready!"; //@GameFlow
function gameStart() {
  //updates countdown until game starts
  if (t > 0) {
    document.getElementById("mesgBottom").innerHTML = "Game starting in: " + t; //@GameFlow
    t--;
  }
  //At the end of the countdown, the game functions start and the interval timer stops
  else {
    document.getElementById("mesgTop").innerHTML = "Cards Dealt"; //@GameFlow
    document.getElementById("mesgBottom").innerHTML = "Find all the SETS!"; //@GameFlow  
    clearInterval(countDown);
    generateBoard(12);
    createAddCardButton();
    playGame(startTimer());
  }
}

function startTimer(){
  let start = Date.now();
  var timeElapsed;
  let timer = setInterval(() => {
    timeElapsed = Date.now() - start;
    document.getElementById("timer").innerHTML = (timeElapsed / 1000).toFixed(3) + " s";
  }, 100);
  return timer;
}

function playGame(timer){
  
  let int = setInterval(() => {
    if(board.length > 0){
      document.getElementById("cardsLeft").innerHTML = "Cards Left: " + cards.length;
      if(board.length < 12){
        addCards();
      }
    } else {
      clearInterval(int);
      stopGame();
    }
  }, 500);
  

  function stopGame(){
    clearInterval(timer);
    document.getElementById("stopTimer").innerHTML = "Well Done! You found all the sets in ";
  }
  
}