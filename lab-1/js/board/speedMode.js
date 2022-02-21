import { speedModeStats, generateBoard, createAddCardButton, cards, addCards, board } from './boardFunctions.js';

let t = 3;
let countDown = setInterval(gameStart, 1000);
document.getElementById("mesg-top").innerHTML = "Get Ready!"; //@GameFlow
function gameStart() {
  //updates countdown until game starts
  if (t > 0) {
    document.getElementById("mesg-bottom").innerHTML = "Game starting in: " + t; //@GameFlow
    t--;
  }
  //At the end of the countdown, the game functions start and the interval timer stops
  else {
    document.getElementById("mesg-top").innerHTML = "Cards Dealt"; //@GameFlow
    document.getElementById("mesg-bottom").innerHTML = "Find all the SETS!"; //@GameFlow
    clearInterval(countDown);
    generateBoard(12);
    createAddCardButton();
    playGame(startTimer());
  }
}


//starts game clock and returns the timer object
let timeElapsed;
function startTimer(){
  let start = Date.now();
  //uses javascript date object finds difference between initial time and current time for total
  //elapsed time. more accurate than setTimeout.
  let timer = setInterval(() => {
    timeElapsed = Date.now() - start;
    let seconds = timeElapsed/1000 + speedModeStats.time*5;
    let minutes = Math.floor(seconds/60);
    seconds -= minutes*60;
    document.getElementById("timer").innerHTML = minutes + " m " + seconds.toFixed(3) + " s";
  }, 100);
  return timer;
}

function playGame(timer){

  //function to update how many cards are left every 500 ms
  let int = setInterval(() => {
    if(board.length > 0){
      document.getElementById("cards-left").innerHTML = "Cards Left: " + cards.length;
      if(board.length < 12){
        addCards();
      }
  //if board is empty, end the game
    } else {
      clearInterval(int);
      stopGame(timer);
    }
  }, 500);

}

//clears timer and shows the overall time
function stopGame(timer){
  clearInterval(timer);
  document.getElementById("stop-timer").innerHTML = "Well Done! You found all the sets in:";
  document.getElementById("mesg-bottom").innerHTML = ((speedModeStats.wins / (speedModeStats.wins + speedModeStats.loses)) * 100).toFixed(1) + "% accuracy";
}
