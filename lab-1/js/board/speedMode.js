import { generateBoard, createAddCardButton, clearBoard } from './boardFunctions.js';

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
      document.getElementById("mesgBottom").innerHTML = "Look for a SET!"; //@GameFlow  
      clearInterval(countDown);
      generateBoard(12);
      createAddCardButton();
    }
  }


function newBoard(){
  let t = 5;
  let countDown = setInterval(setStart, 1000);
  function newCards() {
    //updates countdown until game starts
    if (t > 0) {
      document.getElementById("mesgBottom").innerHTML = "New cards in: " + t; //@GameFlow
      t--;
    }
    //At the end of the countdown, the game functions start and the interval timer stops
    else {
      document.getElementById("mesgTop").innerHTML = "Cards Dealt"; //@GameFlow
      document.getElementById("mesgBottom").innerHTML = "Look for a SET!"; //@GameFlow  
      clearInterval(countDown);
      generateBoard(12);
      createAddCardButton();
    }
  }
}

// function newBoard(numCards) {
//   clearBoard();
//   generateBoard(numCards);
// }
newBoard();
setInterval(newBoard, 10000);
